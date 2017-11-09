var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [

    new Product({
        imagePath: 'https://rockmetalshop.pl/pol_pl_IRON-MAIDEN-IRON-MAIDEN-LP-VINYL--167657_1.jpg',
        title: 'Iron Maiden - Iron Maiden',
        description : ['1. Prowler','2. Sanctuary','3. Remember Tomorrow','4. Running Free','5. Phantom Of The Opera','6. Transylvania','7. Strange World','8. Charlotte The Harlot','9. Iron Maiden '],
        price: 20
    }),
    new Product({
        imagePath: 'https://rockmetalshop.pl/pol_pl_IRON-MAIDEN-THE-NUMBER-OF-THE-BEAST-LP-VINYL--167664_2.jpg',
        title: 'Iron Maiden - The Number of The Beast',
        description: ['1. Invaders','2. Children Of The Damned','3. The Prisoner','4. 22 Acacia Avenue','5. The Number Of The Beast','6. Run To The Hills','7. Gangland','8. Total Eclipse','9. Hallowed Be Thy Name'],
        price: 30
    }),
    new Product({
        imagePath: 'https://farm8.staticflickr.com/7209/13358511944_4cbf0b56df_b.jpg',
        title: 'The Doors - The Soft Parade',
        description: ['SIDE ONE','1. Tell All The People','2. Touch Me','3. Shaman\'s Blues','4. Do It','5. Easy Ride','SIDE TWO','1. Wild Child','2. Runnin\' Blue','3. Wishful Sinful','4. The Soft Parade'],
        price: 40
    }),
    new Product({
        imagePath: 'https://img.discogs.com/5niM71_Gc3Zkk6VK4cRlpHpQRIY=/fit-in/600x590/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-499497-1456047383-9489.jpeg.jpg',
        title: 'The Beatles - Sgt. Pepper\'s Lonely Hearts Club Band',
        description: ['SIDE ONE','1. Sgt. Pepper\'s Lonely Hearts Club Band','2. With a Little Help from My Friends','3. Lucy in the Sky with Diamonds','4. Getting Better','5. Fixing a Hole','6. She\'s Leaving Home','7. Being for the Benefit of Mr. Kite!','SIDE TWO','1. Within You Without You','2.When I\'m Sixty-Four','3. Lovely Rita','4. Good Morning Good Morning','5. Sgt. Pepper\'s Lonely Hearts Club Band (Reprise)','6. A Day in the Life'],	
        price: 50
    }),
    new Product({
        imagePath: 'http://d817ypd61vbww.cloudfront.net/sites/default/files/styles/media_responsive_widest/public/tile/image/AbbeyRoad.jpg?itok=BgfH98zh',
        title: 'The Beatles - Abbey Road',
        description: ['SIDE ONE','1. Come Together','2.Something','3. Maxwell\'s Silver Hammer','4. Oh! Darling','5. Octopus\'s Garden','6. I Want You (She\'s So Heavy)','SIDE TWO','1. Here Comes the Sun','2. Because','3. You Never Give Me Your Money',' 4. Sun King ','5.	Mean Mr. Mustard','6. Polythene Pam','7. She Came in Through the Bathroom Window','8. Golden Slumbers','9. Carry That Weight','10. The End','11. Her Majesty'],
        price: 50
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
