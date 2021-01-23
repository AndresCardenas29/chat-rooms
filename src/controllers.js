function about(req, res) {
    res.render('index');
}

function room(req,res) {
    if (req.route.path == '/room/:id') {
        let id = req.params.id;
        res.render('room',{'id': id});
        return;
    } else if (req.route.path == '/room') {
        res.render('room', {id:"Public"});
        return;
    }
    // console.log(req.route.path);
}

module.exports = {
    about,
    room
}