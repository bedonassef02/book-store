import {CouponService} from "../services/coupon.service.mjs";

class CouponController {
    constructor() {
        this.couponService = new CouponService();
    }

    async findAll(request, response) {
        const coupons = await this.couponService.findAll();
        response.status(200).json(coupons);
    }

    async create(request, response) {
        const {code, expirationDate, discount, books} = request.body;
        const createdCoupon = await this.couponService.create({
            code: code,
            expirationDate: expirationDate,
            discount: discount,
            books: books
        });
        response.status(201).json(createdCoupon);
    }

    async delete(request, response) {
        const {code} = request.params;
        const coupon = await this.couponService.delete(code);
        if (coupon) response.status(200).json({msg: 'Coupon deleted successfully'});
        else response.status(404).json({msg: 'Coupon not found'});
    }

    async applyCoupon(request, response) {
        const {book_id, code} = request.params;
        const book = await this.couponService.applyCoupon(book_id, code);
        if (book) response.status(200).json(book);
        else response.status(404).json({msg: 'book id does not have this coupon'});
    }

    async removeOutdatedCoupons(request, response) {
        const removedCouponsCount = await this.couponService.removeOutdatedCoupons();
        response.status(200).json({msg: `removed ${removedCouponsCount}`})
    }
}

export {CouponController};