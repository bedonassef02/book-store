import {AuthService} from "../services/auth.service.mjs";

class AuthController {

    constructor() {
        this.authService = new AuthService();
    }

    async register(request, response) {
        const {username, email, password} = request.body;
        const user = await this.authService.create({username, email, password});
        const token = await this.authService.generateToken(user);
        response.status(201).json({user, token});
    }


    async login(request, response) {
        const {email, password} = request.body;
        const user = await this.authService.login({email, password});
        if(!user) return response.status(404).json({message: 'Invalid email or password'});
        const token = await this.authService.generateToken(user);
        response.status(200).json({user, token});
    }

}

export {AuthController}