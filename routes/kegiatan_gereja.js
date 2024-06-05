var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX kegiatan_gereja
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM kegiatan_gereja ORDER BY id_kegiatan desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('kegiatan_gereja', {
                data: ''
            });
        } else {
            //render ke view kegiatan_gereja index
            res.render('kegiatan_gereja/index', {
                data: rows // <-- data kegiatan_gereja
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('kegiatan_gereja/create', {
        nama_kegiatan: '',
        tanggal_kegiatan: '',
        jam_kegiatan: '',
        lokasi_kegiatan: ''
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    

    let nama_kegiatan   = req.body.nama_kegiatan;
    let tanggal_kegiatan = req.body.tanggal_kegiatan;
    let jam_kegiatan   = req.body.jam_kegiatan;
    let lokasi_kegiatan   = req.body.lokasi_kegiatan;
    let errors  = false;

    if(nama_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Nama Kegiatan");
        // render to add.ejs with flash message
        res.render('kegiatan_gereja/create', {
            nama_kegiatan: nama_kegiatan,
            tanggal_kegiatan: tanggal_kegiatan,
            jam_kegiatan: jam_kegiatan,
            lokasi_kegiatan: lokasi_kegiatan
        })
    }

    if(tanggal_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Tanggal Kegiatan");
        // render to add.ejs with flash message
        res.render('kegiatan_gereja/create', {
            nama_kegiatan: nama_kegiatan,
            tanggal_kegiatan: tanggal_kegiatan,
            jam_kegiatan: jam_kegiatan,
            lokasi_kegiatan: lokasi_kegiatan
        })
    }

    if(jam_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Jam Kegiatan");
        // render to add.ejs with flash message
        res.render('kegiatan_gereja/create', {
            nama_kegiatan: nama_kegiatan,
            tanggal_kegiatan: tanggal_kegiatan,
            jam_kegiatan: jam_kegiatan,
            lokasi_kegiatan: lokasi_kegiatan
        })
    }

    if(lokasi_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Lokasi Kegiatan");
        // render to add.ejs with flash message
        res.render('kegiatan_gereja/create', {
            nama_kegiatan: nama_kegiatan,
            tanggal_kegiatan: tanggal_kegiatan,
            jam_kegiatan: jam_kegiatan,
            lokasi_kegiatan: lokasi_kegiatan
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            nama_kegiatan: nama_kegiatan,
            tanggal_kegiatan: tanggal_kegiatan,
            jam_kegiatan: jam_kegiatan,
            lokasi_kegiatan: lokasi_kegiatan
        }
        
        // insert query
        connection.query('INSERT INTO kegiatan_gereja SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('kegiatan_gereja/create', {
                    nama_kegiatan: formData.nama_kegiatan,
                    tanggal_kegiatan: formData.tanggal_kegiatan,
                    jam_kegiatan: formData.jam_kegiatan,
                    lokasi_kegiatan: formData.lokasi_kegiatan                      
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/kegiatan_gereja');
            }
        })
    }

})

/**
 * EDIT POST
 */
router.get('/edit/(:id_kegiatan)', function(req, res, next) {

    let id_kegiatan = req.params.id_kegiatan;
   
    connection.query('SELECT * FROM kegiatan_gereja WHERE id_kegiatan = ' + id_kegiatan, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan id_kegiatan ' + id_kegiatan + " Tidak Ditemukan")
            res.redirect('/kegiatan_gereja')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('kegiatan_gereja/edit', {
                id_kegiatan:      rows[0].id_kegiatan,
                nama_kegiatan:   rows[0].nama_kegiatan,
                tanggal_kegiatan: rows[0].tanggal_kegiatan,
                jam_kegiatan:   rows[0].jam_kegiatan,
                lokasi_kegiatan: rows[0].lokasi_kegiatan
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.post('/update/:id_kegiatan', function(req, res, next) {

    let id_kegiatan      = req.params.id_kegiatan;
    let nama_kegiatan   = req.body.nama_kegiatan;
    let tanggal_kegiatan = req.body.tanggal_kegiatan;
    let jam_kegiatan   = req.body.jam_kegiatan;
    let lokasi_kegiatan = req.body.lokasi_kegiatan;
    let errors  = false;

    if(nama_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Nama Kegiatan");
        // render to edit.ejs with flash message
        res.render('kegiatan_gereja/edit', {
            id_kegiatan:         req.params.id_kegiatan,
            nama_kegiatan:      nama_kegiatan,
            tanggal_kegiatan:    tanggal_kegiatan,
            jam_kegiatan:      jam_kegiatan,
            lokasi_kegiatan:    lokasi_kegiatan
        })
    }

    if(tanggal_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Tanggal Kegiatan");
        // render to edit.ejs with flash message
        res.render('kegiatan_gereja/edit', {
            id_kegiatan:         req.params.id_kegiatan,
            nama_kegiatan:      nama_kegiatan,
            tanggal_kegiatan:    tanggal_kegiatan,
            jam_kegiatan:      jam_kegiatan,
            lokasi_kegiatan:    lokasi_kegiatan
        })
    }

    if(jam_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Jam Kegiatan");
        // render to edit.ejs with flash message
        res.render('kegiatan_gereja/edit', {
            id_kegiatan:         req.params.id_kegiatan,
            nama_kegiatan:      nama_kegiatan,
            tanggal_kegiatan:    tanggal_kegiatan,
            jam_kegiatan:      jam_kegiatan,
            lokasi_kegiatan:    lokasi_kegiatan
        })
    }

    if(lokasi_kegiatan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Lokasi Kegiatan");
        // render to edit.ejs with flash message
        res.render('kegiatan_gereja/edit', {
            id_kegiatan:         req.params.id_kegiatan,
            nama_kegiatan:      nama_kegiatan,
            tanggal_kegiatan:    tanggal_kegiatan,
            jam_kegiatan:      jam_kegiatan,
            lokasi_kegiatan:    lokasi_kegiatan
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            nama_kegiatan: nama_kegiatan,
            tanggal_kegiatan: tanggal_kegiatan,
            jam_kegiatan: jam_kegiatan,
            lokasi_kegiatan: lokasi_kegiatan
        }

        // update query
        connection.query('UPDATE kegiatan_gereja SET ? WHERE id_kegiatan = ' + id_kegiatan, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('kegiatan_gereja/edit', {
                    id_kegiatan:     req.params.id_kegiatan,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/kegiatan_gereja');
            }
        })
    }
})

/**
 * DELETE POST
 */
router.get('/delete/(:id_kegiatan)', function(req, res, next) {

    let id_kegiatan = req.params.id_kegiatan;
     
    connection.query('DELETE FROM kegiatan_gereja WHERE id_kegiatan = ' + id_kegiatan, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to kegiatan_gereja page
            res.redirect('/kegiatan_gereja')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to kegiatan_gereja page
            res.redirect('/kegiatan_gereja')
        }
    })
})

module.exports = router;