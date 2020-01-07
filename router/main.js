const formidable = require('formidable'),
      fs         = require('fs');

module.exports = function(app)
{
    app.get('/',function(req,res){
        res.render('index');
    });
    app.get('/search_form',function(req,res){
        res.render('search_form');
    });
    app.get('/search',function(req,res){
        res.render('search', { camera: req.query.camera });
    });
    app.get('/post_form',function(req,res){
        res.render('post_form');
    });
    app.post('/post',function(req,res){
        res.render('post', { cameraModel: req.body.cameraModel, description: req.body.description });
    });
    app.get('/image_form',function(req,res){
        res.render('image_form');
    });
    app.post('/upload_image',function(req,res){
        const form = new formidable.IncomingForm();
        const parsedData = form.parse(req);
        // console.log(parsedData);
        if(parsedData.bytesExpected > 189 && parsedData.bytesExpected < 200000){
            // limit upload file size 200kb
            // form.maxFileSize = 200 * 1024;
            // form.on('error', function(err){
            //     console.log(err);
            // });
            // move the file to the folder
            form.uploadDir = './public/images/';
            form.keepExtensions = true;
            form.on('fileBegin', function(name, file){
                file.path = form.uploadDir + file.name;
            });
            // process.on('uncaughtException', function(err){
            //     console.log(err);
            // });
        }
        form.on('file', function(name, file){
            res.render('upload_image', { file: file });
        });

        // form.parse(req, function (err, fields, files) {
        //     console.log(files);
        //     let oldpath = files.image.path;
        //     let newpath = './public/images/' + files.image.name;
        //     fs.rename(oldpath, newpath, function (err) {
        //         if (err) throw err;
        //         res.render('upload_image', { files: files });
        //     });
        // });

    });
}
