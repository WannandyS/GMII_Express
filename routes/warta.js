var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX warta
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM warta ORDER BY id_warta desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('warta', {
                data: ''
            });
        } else {
            //render ke view warta index
            res.render('warta/index', {
                data: rows // <-- data warta
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('warta/create', {
        tanggal_warta: '',
        bacaan_warta: ''
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    

    let tanggal_warta   = req.body.tanggal_warta;
    let bacaan_warta = req.body.bacaan_warta;
    let errors  = false;

    if(tanggal_warta.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Tanggal Warta");
        // render to add.ejs with flash message
        res.render('warta/create', {
            tanggal_warta: tanggal_warta,
            bacaan_warta: bacaan_warta
        })
    }

    if(bacaan_warta.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Bacaan Warta");
        // render to add.ejs with flash message
        res.render('warta/create', {
            tanggal_warta: tanggal_warta,
            bacaan_warta: bacaan_warta
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            tanggal_warta: tanggal_warta,
            bacaan_warta: bacaan_warta
        }
        
        // insert query
        connection.query('INSERT INTO warta SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('warta/create', {
                    tanggal_warta: formData.tanggal_warta,
                    bacaan_warta: formData.bacaan_warta                    
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/warta');
            }
        })
    }

})

/**
 * EDIT POST
 */
router.get('/edit/(:id_warta)', function(req, res, next) {

    let id_warta = req.params.id_warta;
   
    connection.query('SELECT * FROM warta WHERE id_warta = ' + id_warta, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan id_warta ' + id_warta + " Tidak Ditemukan")
            res.redirect('/warta')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('warta/edit', {
                id_warta:      rows[0].id_warta,
                tanggal_warta:   rows[0].tanggal_warta,
                bacaan_warta: rows[0].bacaan_warta
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.post('/update/:id_warta', function(req, res, next) {

    let id_warta      = req.params.id_warta;
    let tanggal_warta   = req.body.tanggal_warta;
    let bacaan_warta = req.body.bacaan_warta;
    let errors  = false;

    if(tanggal_warta.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan tanggal_warta");
        // render to edit.ejs with flash message
        res.render('warta/edit', {
            id_warta:         req.params.id_warta,
            tanggal_warta:      tanggal_warta,
            bacaan_warta:    bacaan_warta
        })
    }

    if(bacaan_warta.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to edit.ejs with flash message
        res.render('warta/edit', {
            id_warta:         req.params.id_warta,
            tanggal_warta:      tanggal_warta,
            bacaan_warta:    bacaan_warta
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            tanggal_warta: tanggal_warta,
            bacaan_warta: bacaan_warta
        }

        // update query
        connection.query('UPDATE warta SET ? WHERE id_warta = ' + id_warta, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('warta/edit', {
                    id_warta:     req.params.id_warta,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/warta');
            }
        })
    }
})

/**
 * DELETE POST
 */
router.get('/delete/(:id_warta)', function(req, res, next) {

    let id_warta = req.params.id_warta;
     
    connection.query('DELETE FROM warta WHERE id_warta = ' + id_warta, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to warta page
            res.redirect('/warta')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to warta page
            res.redirect('/warta')
        }
    })
})

module.exports = router;