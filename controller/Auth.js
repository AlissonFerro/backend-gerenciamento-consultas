class AuthController{
    static async login(req, res){
        console.log(req.body);

    }

    static async register(req, res){
        console.log(req.body);
    }
}

module.exports = AuthController;