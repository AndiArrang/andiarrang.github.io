
import { Bukhari } from "../models/bukhariModel.js";
import stopword from 'stopword';
import db from "../config/db.js";
import { Tokenizer, Stemmer } from 'sastrawijs';
export const getAllHadits = async (req,res) => {

    // fungsi untuk preprocessing query
    function preprocessText(text) {
        const tokenizer = new Tokenizer();
        const stemmer = new Stemmer();

        // Tokenisasi teks
        const tokens = tokenizer.tokenize(text);

        // Menghapus stopword
        const filteredTokens = stopword.removeStopwords(tokens, stopword.ind);

        // Stemming
        const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));
        console.log(stopword.ind)

        // Menggabungkan kata-kata yang telah diproses menjadi satu string
        const processedText = stemmedTokens.join(' ');

        return processedText;  
    }

    const query = preprocessText(req.body.query)
    
    const searchKeywords = query.split(' ') // Array kata kunci pencarian dari pengguna
    let querySQL = "SELECT * FROM bukhari WHERE";
    
    // Membangun kondisi pencarian dinamis berdasarkan kata kunci yang dimasukkan
    searchKeywords.forEach((keyword, index) => {
      querySQL += ` Label LIKE '%${keyword}%'`;
    
      // Menambahkan operator OR jika bukan kata kunci terakhir
      if (index !== searchKeywords.length - 1) {
        querySQL += " OR";
      }
    });
    
    // Eksekusi query atau tindakan lainnya menggunakan query yang dibangun
    
    const [data, metadata] = await db.query(querySQL);
    const numDocs = data.length // jumlah total dokumen(N)
    // menghitung jumlah kemunculan term pada seluruh dokumen(dfi) & membuat dictionary
    const termCount = {}; 
    const dictionary = new Set();
    data.forEach((item) => {
        const word = item.PreprocessingText.split(' ');
        word.map((term) => {
            dictionary.add(term)
            termCount[term] = (termCount[term] || 0) + 1;
        })
    })
    //  console.log(dictionary)
    const docTfIdf = () => {
        
        //menghitung TF-IDF untuk setiap term pada seluruh dokumen
        const tfidfMatrix = []
        for (const doc of data) { 
        const terms = doc.PreprocessingText.split(' '); // memecah teks menjadi array kata-kata
        const tf = {}; // menyimpan nilai TF untuk setiap term pada dokumen ini
        for (const term of terms) {
            tf[term] = (tf[term] || 0) + 1;
        }
        // console.log( tf)
        const tfIdf = {}; // menyimpan hasil perhitungan TF-IDF untuk setiap term
        const vektor = []
        for (const term of Object.keys(tf)) {
            const idf = Math.log(numDocs / (termCount[term] || 1)); // menghitung nilai IDF untuk term ini
            tfIdf[term]= tf[term] * idf; // menghitung nilai TF-IDF untuk term ini pada dokumen ini
        }
       
        dictionary.forEach((term,i) => {
            vektor.push(tfIdf[term] || 0)
        })
        
        tfidfMatrix.push(vektor)
        }
        // console.log(tfidfMatrix)
        return tfidfMatrix
    }
    
    // fungsi hitung tfidf dari query
    const queryTfIdf = () => {
        const tf = {}; // menyimpan nilai TF untuk setiap term pada dokumen ini
        const processedTokens = query.split(' ')

            dictionary.forEach((term) => {
                tf[term] = 0;
                processedTokens.forEach((item) =>{
                    if (item === term) {
                        tf[term]++;
                    }
                })
            })
            
            const vektor = []
            for (const term of Object.keys(tf)) {
                const idf = Math.log(numDocs/ (termCount[term] || 1)); // menghitung nilai IDF untuk term ini
                vektor.push(tf[term] * idf); // menghitung nilai TF-IDF untuk term ini pada dokumen ini
            }
        return vektor;
    }

    const search =(k) => {
       
        const queryVector = queryTfIdf();
    
        const similarities = [];
        docTfIdf().forEach((vector, i) => {
        const similarity = cosineSimilarity(queryVector, vector);
        similarities.push({ No: data[i].No,Arab: data[i].Arab ,Terjemah: data[i].Terjemah, Kitab: data[i].Kitab ,similarity });
        });
    
        similarities.sort((a, b) => b.similarity - a.similarity);
        return similarities.slice(0, k);
    }

    // Fungsi untuk menghitung cosine similarity
    function cosineSimilarity(vectorA, vectorB) {
        const dotProduct = vectorA.reduce((acc, curr, i) => {
        return acc + (curr * vectorB[i]);
        }, 0);
    
        const magnitudeA = Math.sqrt(vectorA.reduce((acc, curr) => {
        return acc + (curr * curr);
        },0));
    
        const magnitudeB = Math.sqrt(vectorB.reduce((acc, curr) => {
        return acc + (curr * curr);
        }, 0));
        
        return dotProduct / (magnitudeA * magnitudeB);
        }
        
        // Contoh penggunaan

        const result = search(5)
    
        
    
    res.status(200).json({data: result})
    // if (data != null) {
    //     res.status(200).json({
    //         data
    //     })
    //     // res.send(data)      
    // } else {
    //     res.status(404).json({msg: "data tidak ditemukan"})      
    // }   

}



export const getHaditsByKitab = async (req,res) => {
    
    const data = await Bukhari.findAll({where: {  
        Kitab: req.params.nama_kitab
    }});

    if (data != null) {
        res.status(200).json({
            data
        })
        // res.send(data)      
    } else {
        res.status(404).json({msg: "data tidak ditemukan"})      
    }   

}

export const getAllKitabName = async (req,res) => {
    console.log('nama kitab')
    const data = await Bukhari.findAll({
        attributes: ['Kitab']
    })

   //fungsi untuk menghapus duplikat objek
   function removeDuplicateObjects(array, key) {
    const uniqueObjects = [];
    const encounteredKeys = new Set();
  
    for (const obj of array) {
      const objKey = key ? obj[key] : JSON.stringify(obj);
  
      if (!encounteredKeys.has(objKey)) {
        uniqueObjects.push(obj);
        encounteredKeys.add(objKey);
      }
    }
  
    return uniqueObjects;
  }
  
    if (data != null) {
        res.status(200).json({
            data: removeDuplicateObjects(data)
        })
        // res.send(data)      
    } else {
        res.status(404).json({msg: "data tidak ditemukan"})      
    }   
}