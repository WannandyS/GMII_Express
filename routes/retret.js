var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX retret
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM retret ORDER BY id_retret desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('retret', {
                data: ''
            });
        } else {
            //render ke view retret index
            res.render('retret/index', {
                data: rows // <-- data retret
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('retret/create', {
        file_informasi_retret: '',
        informasi_retret: ''
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    

    let file_informasi_retret   = req.body.file_informasi_retret;
    let informasi_retret = req.body.informasi_retret;
    let errors  = false;

    if(file_informasi_retret.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan file_informasi_retret");
        // render to add.ejs with flash message
        res.render('retret/create', {
            file_informasi_retret: file_informasi_retret,
            informasi_retret: informasi_retret
        })
    }

    if(informasi_retret.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('retret/create', {
            file_informasi_retret: file_informasi_retret,
            informasi_retret: informasi_retret
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            file_informasi_retret: file_informasi_retret,
            informasi_retret: informasi_retret
        }
        
        // insert query
        connection.query('INSERT INTO retret SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('retret/create', {
                    file_informasi_retret: formData.file_informasi_retret,
                    informasi_retret: formData.informasi_retret                    
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/retret');
            }
        })
    }

})

/**
 * EDIT POST
 */
router.get('/edit/(:id_retret)', function(req, res, next) {

    let id_retret = req.params.id_retret;
   
    connection.query('SELECT * FROM retret WHERE id_retret = ' + id_retret, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan id_retret ' + id_retret + " Tid_retretak Ditemukan")
            res.redirect('/retret')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('retret/edit', {
                id_retret:      rows[0].id_retret,
                file_informasi_retret:   rows[0].file_informasi_retret,
                informasi_retret: rows[0].informasi_retret
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.post('/update/:id_retret', function(req, res, next) {

    let id_retret      = req.params.id_retret;
    let file_informasi_retret   = req.body.file_informasi_retret;
    let informasi_retret = req.body.informasi_retret;
    let errors  = false;

    if(file_informasi_retret.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan file_informasi_retret");
        // render to edit.ejs with flash message
        res.render('retret/edit', {
            id_retret:         req.params.id_retret,
            file_informasi_retret:      file_informasi_retret,
            informasi_retret:    informasi_retret
        })
    }

    if(informasi_retret.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to edit.ejs with flash message
        res.render('retret/edit', {
            id_retret:         req.params.id_retret,
            file_informasi_retret:      file_informasi_retret,
            informasi_retret:    informasi_retret
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            file_informasi_retret: file_informasi_retret,
            informasi_retret: informasi_retret
        }

        // update query
        connection.query('UPDATE retret SET ? WHERE id_retret = ' + id_retret, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('retret/edit', {
                    id_retret:     req.params.id_retret,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/retret');
            }
        })
    }
})

/**
 * DELETE POST
 */
router.get('/delete/(:id_retret)', function(req, res, next) {

    let id_retret = req.params.id_retret;
     
    connection.query('DELETE FROM retret WHERE id_retret = ' + id_retret, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to retret page
            res.redirect('/retret')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to retret page
            res.redirect('/retret')
        }
    })
})

router.get('/fe', function(req, res, next) {
    //query
    connection.query('SELECT * FROM retret ORDER BY id_retret desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.status(500).json({
                error: 'internal server error'
            })
        } else {
            
            res.json(rows)
        }
    });
})

module.exports = router;