const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const imageToBase64 = require('image-to-base64');
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const speed = require('performance-now');
const menu = require("./lib/menu.js")

//Setting

const apivhtear = 'Apikey vhtear';
const apibarbar = 'Apikey mhankbarbar';
const BotName = 'BOT Syahriz'; 
const instagram = '@_.riz.s'; 
const aktif = '24 Jam';
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Syahriz\n' // Nama kamu
            + 'ORG:BOT Syahriz;\n' // Nama bot
            + 'TEL;type=CELL;type=VOICE;waid=60193409203:+60 19-340 9203\n' //Nomor whatsapp kamu
            + 'END:VCARD'
const
{
WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
   GroupSettingChange,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

// OCR Library
const readTextInImage = require('./lib/ocr')

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr dengan whatsapp!`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json') //create arel bot
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log('Lexa Bot')
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by ig:@mrf.zvx`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);

//fitur
if (text.includes('.Seberapabucin')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes(".seberapabucin")){
const teks = text.replace(/.seberapabucin /, "")
axios.get(`https://arugaz.herokuapp.com/api/howbucins`).then((res) => {
    let hasil = `*Bucin Detected*\n*Persentase* : ${res.data.persen}% \n_${res.data.desc}_ `;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}
//Tanye je
if (text.includes('#Apakah')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .apakah aku cantik_',MessageType.text, {quoted: m});
}
if (text.includes('#Bolehkah')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .bolehkah aku mencintai dia_',MessageType.text, {quoted: m});
}
if (text.includes('#Bila')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .bila aku kaya_',MessageType.text, {quoted: m});
}
if (text.includes('#apakah')){
const teks = text.replace(/./, '')
const truth =[
'Ya',
'Tidak',
'Bisa Jadi',
'Cuba tanya lagi',
'Mungkin',
'']
const ttrth = truth[Math.floor(Math.random() * truth.length)]
conn.sendMessage(id, 'Pertanyaan : *'+teks+'*\n\nJawaban : '+ ttrth, MessageType.text, { quoted: m })
}

if (text.includes('#bolehkah')){
const teks = text.replace(/./, '')
const truth =[
'Boleh',
'Tidak boleh',
'Sangat di anjurkan',
'Cuba tanya lagi',
'Tidak',
'Mungkin',
'Jangan']
const ttrth = truth[Math.floor(Math.random() * truth.length)]
conn.sendMessage(id, 'Pertanyaan : *'+teks+'*\n\nJawaban : '+ ttrth, MessageType.text, { quoted: m })
}


if (text.includes('#Bila')){
const teks = text.replace(/./, '')
const truth =[
'1 Hari lagi',
'2 hari lagi',
'3 hari lagi',
'4 hari lagi',
'5 hari lagi',
'6 hari lagi',
'1 minggu lagi',
'2 minggu lagi',
'3 minggu lagi',
'1 bulan lagi',
'2 bulan lagi',
'3 hari lagi',
'4 bulan lagi',
'5 bulan lagi',
'6 hari lagi',
'7 bulan lagi',
'8 bulan lagi',
'9 hari lagi',
'10 bulan lagi',
'11 bulan lagi',
'1 tahun lagi',
'2 tahun lagi',
'3 tahun lagi',
'4 tahun lagi',
'Tidak akan',
'Yakin bakal terjadi ?',
'Aku meragukan nya',
'Lusa',
'Akhir bulan depan',
'Awal bulan depan',
'Tahun depan',
'Bulan depan',
'Sebentar lagi',
'']
const ttrth = truth[Math.floor(Math.random() * truth.length)]
conn.sendMessage(id, 'Pertanyaan : *'+teks+'*\n\nJawaban : '+ ttrth, MessageType.text, { quoted: m })
}

  //Menekagambar
if (text.includes('#Menekagambar')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#menekagambar")){
axios.get(`https://api.vhtear.com/tebakgambar&apikey=${apivhtear}`).then((res) => {
    imageToBase64(res.data.result.soalImg)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Menulis ⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
})
}

 //Info owner
if (text.includes('#Owner')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#owner')){
conn.sendMessage(id, {displayname: "Syahriz", vcard: vcard}, MessageType.contact, { quoted: m } )
}

  //Ganti nama group
if (text.includes('#Setname')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#setname")){
const teks = text.replace(/#setname /, "")
    let nama = `${teks}`;
    let idgrup = `${id.split("@s.whatsapp.net")[0]}`;
    conn.groupUpdateSubject(idgrup, nama);
conn.sendMessage(id, 'Sukses mengganti Nama Group' ,MessageType.text, { quoted: m } );

}

  //Ganti description group
if (text.includes('#Setdesc')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#setdesc")){
const teks = text.replace(/.#setdesc /, "")
    let desk = `${teks}`;
    let idgrup = `${id.split("@s.whatsapp.net")[0]}`;
    conn.groupUpdateDescription(idgrup, desk)
conn.sendMessage(id, 'Berjaya mengganti description group' ,MessageType.text, { quoted: m } );

}

  //Map
if (text.includes('#Map')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#map')){
  var teks = text.replace(/#map /, '')
    axios.get('https://mnazria.herokuapp.com/api/maps?search='+teks)
    .then((res) => {
      imageToBase64(res.data.gambar)
        .then(
          (ress) => {
            conn.sendMessage(id, '[WAIT] Searching  silakan tunggu', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}

  //Tag
if (text.includes('#Tagme')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#tagme')) {
 var nomor = m.participant
 const options = {
       text: `@${nomor.split("@s.whatsapp.net")[0]} Hai kak 🤗`,
       contextInfo: { mentionedJid: [nomor] }
 }
 conn.sendMessage(id, options, MessageType.text)
}

  //Nulis dibuku
if (text.includes('#Tulis')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#Tulis')){
  const teks = text.replace(/#tulis /, '')
    axios.get(`https://st4rz.herokuapp.com/api/nulis?text=${teks}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Menulis ⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf ,MessageType.image, { quoted: m } )
        })
    })
}
  //Pengucapan ulang
if (text.includes('#Say')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#say")){
  const teks = text.replace(/#say /, "")
conn.sendMessage(id, teks, MessageType.text)
}
  //Youtube download 
if (text.includes('#Ytmp4')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#ytmp4')){
const teks = text.replace(/#ytmp4 /, "")
axios.get(`https://st4rz.herokuapp.com/api/ytv?url=${teks}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Mendownload...⏳ silahkan tunggu', MessageType.text, {quoted: m } )
    let hasil = `Klik link dan download hasilnya️\n*Judul* : ${res.data.title}\n*Ukuran* : ${res.data.filesize}\n*Format* : MP4\n*Link* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

if (text.includes('#Ytmp3')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#ytmp3')){
const teks = text.replace(/#ytmp3 /, "")
axios.get(`https://st4rz.herokuapp.com/api/yta?url=${teks}`).then((res) => {
    conn.sendMessage(id, '[ WAIT ] Mendownload...⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `Klik link dan download hasilnya\n*Judul* : ${res.data.title}\n*Ukuran video* : ${res.data.filesize}\n*Format* : MP3\n*Link* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Instagram download
if (text.includes('#Ig')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#ig')){
const teks = text.replace(/#ig /, "")
axios.get(`https://mhankbarbars.herokuapp.com/api/ig?url=${teks}&apiKey=${apibarbar}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Mendownload...⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `Klik link dan download hasilnya!\n*Link* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Facebook download
if (text.includes('#Fb')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#fb')){
const teks = text.replace(/#fb /, "")
axios.get(`https://api.vhtear.com/fbdl?link=${teks}&apikey=${apivhtear}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Mendownload...⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `Klik link dan download hasilnya!\n*Judul* : ${res.data.title}\n*Link* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Twitter download
if (text.includes('#Twt')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#twt')){
const teks = text.replace(/#twt /, "")
axios.get(`https://mhankbarbars.herokuapp.com/api/twit?url=${teks}&apiKey=${apibarbar}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Mendownload⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `Klik link dan download hasilnya!\n*Link* : ${res.data.result}\n*Judul* : ${res.data.title}\n${res.data.quote}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Pencarian wiki
if (text.includes('#Wiki')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#wiki")){
const teks = text.replace(/#wiki /, "")
axios.get(`https://alfians-api.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching...⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `Menurut Wikipedia:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  // Optical Character Recognition
  if (messageType == 'imageMessage')
   {
       let caption = imageMessage.caption.toLocaleLowerCase()
       if (caption == '.ocr')
       {
           const img = await conn.downloadAndSaveMediaMessage(m)
           readTextInImage(img)
               .then(data => {
                   console.log(data)
                   conn.sendMessage(id, `${data}`, MessageType.text, { quoted: m } );
               })
               .catch(err => {
                   console.log(err)
               })
       }
   }

  //Pict to sticker
   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '#stiker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType#sticker, { quoted: m } )
         });
      }
        if (caption == '.#sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file
         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType#sticker, { quoted: m } )
         });
      }
   }

  //Pantun
   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '#pantun')
      {
         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }
   };

  //Pencarian lirik
if (text.includes('#Lirik')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#lirik")){
	const teks = text.split("#lirik")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	     conn.sendMessage(id, '[ WAIT ] Searching lirik⏳ silakan tunggu', MessageType.text, { quoted: m } )
	 	let hasil = `lirik ${teks} \n\n\n ${res.data.result.lirik}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
	})
}

  //Random wallpaper
if (text.includes('#Wp')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#wp"))
   {
    var items = ["wallpaper aesthetic", "wallpaper tumblr"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching wallpaper⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf, MessageType.image, { quoted : m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    });
    }

  //quotes
if (text.includes('#Quotes')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#quotes"))
   {
    var items = ["sajak rindu", "Kata kata bucin", "kata kata motivasi", "kata kata romantis", "quotes bucin"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching ⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf ,MessageType.image, { caption: `Nih gan`, quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    });
    }

  //Pencarian image
if (text.includes('#Img')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#img"))
   {
    var teks = text.replace(/.img /, "");
    var items = [`${teks}`];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
    conn.sendMessage(id, buf ,MessageType.image, { quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
            });
    }

  //Stalker instagram
if (text.includes('#Stalk')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#stalk")){
const sons = text.replace(/#stalk /, "")
axios.get(`https://alfians-api.herokuapp.com/api/stalk?username=${sons}`).then ((res) =>{
    imageToBase64(res.data.Profile_pic)
        .then(
    (ress) => {
    var buf = Buffer.from(ress, 'base64')
    conn.sendMessage(id, '[ WAIT ] Stalking⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `*>Username* : ${res.data.Username}\n*>Nama* : ${res.data.Name}\n*>Follower* : ${res.data.Jumlah_Followers}\n*>Following* : ${res.data.Jumlah_Following}\n*>Jumlah Post* : ${res.data.Jumlah_Post}\n*>Bio* : ${res.data.Biodata}\n\nFollow : https://www.instagram.com/mrf.zvx/`;
    conn.sendMessage(id, buf ,MessageType.image, { caption: hasil, quoted: m } );
    })
})
}

//Pencarian chord gitar
if (text.includes('#Chord')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#chord")){
const teks = text.replace(/#chord /, "")
axios.get(`https://arugaz.herokuapp.com/api/chord?q=${teks}`).then((res) => {
    conn.sendMessage(id, '[ WAIT ] Searching chord lagu⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `*Judul* : ${teks}\n*chord* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}
  //Nama ninja
if (text.includes('#Namae')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#namae")){
const teks = text.replace(/#namae /, "")
axios.get(`https://api.terhambar.com/ninja?nama=${teks}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Menggubah namamu⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `Nama Ninja kamu:\n\n*${res.data.result.ninja}*`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}
  //Random puisi
if (text.includes('#Puisi')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#puisi1")){
	axios.get(`https://arugaz.herokuapp.com/api/puisi1`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

if (text.includes("#puisi2")){
	axios.get(`https://arugaz.herokuapp.com/api/puisi2`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

if (text.includes("#puisi3")){
	axios.get(`https://arugaz.herokuapp.com/api/puisi3`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

  //Random cerpen
if (text.includes('#Cerpen')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#cerpen")){
	axios.get(`https://arugaz.herokuapp.com/api/cerpen`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching cerpen⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

  //Pemendek link
if (text.includes('#Shortlink')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes("#shortlink")){
const teks = text.replace(/#shortlink /, "")
axios.get(`https://tobz-api.herokuapp.com/api/shorturl?url=${teks}`).then((res) => {
    let hasil = `${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

if (text.includes('#Logoesport')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes('#logoesport')){
const teks = text.replace(/#logoesport /, "")
    axios.get(`https://docs-jojo.herokuapp.com/api/gaming?text=${teks}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

//Random Al-Qur'an
if (text.includes('#Ngaji')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
else if (text == '#ngaji'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Menu
if (text == '#menu'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu#menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, aktif) ,MessageType.text);
}

  //Al-Qur'an
if (text.includes('#Alquran')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .alquran 1_',MessageType.text, {quoted: m});
}
if (text.includes("#alquran")){
const teks = text.replace(/#alquran /, "")
axios.get(`https://api.vhtear.com/quran?no=${teks}&apikey=${apivhtear}`).then((res) => {
    let hasil = `*Surah* : ${res.data.result.surah}\n${res.data.result.quran}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //truth
if (text.includes('.Truth')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, {quoted: m});
}
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.truth')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/truth.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }
   };

  //dare
if (text.includes('.Dare')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, {quoted: m});
}
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.dare')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/dare.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }
   };
  
  //status bapack
if (text.includes('.Statpack')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, {quoted: m});
}
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.statpack')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/statusbapack.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }

   };

//tod
if (text.includes('.Tod')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, {quoted: m});
}
if (text.includes('.tod')){
conn.sendMessage(id, `Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang di berikan. 
Silakan pilih :
*.Truth*
*.Dare*
*Selesaikan perintah untuk melakukan TOD selanjutnya* ⚠️` ,MessageType.text, {quoted: m});
}

//Hay gay
//create @mrf.zvx don't delate this please
	
})
