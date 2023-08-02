import {Coupon} from "../models/coupon.model.mjs";
import {BookService} from "./book.service.mjs";
import moment from "moment";

class CouponService {

    constructor() {
        this.bookService = new BookService();
    }

    async findAll() {
        return Coupon.find();
    }

    async create({code, discount, expirationDate, books}) {
        const formattedDate = moment(expirationDate, "DD-MM-YYYY").toDate();
        return await Coupon.create({code: code, discount: discount, expirationDate: formattedDate, books: books})
    }

    async delete(code) {
        const coupon = await this.#isCodeExist(code);
        if (!coupon) return false;
        return Coupon.deleteOne({code: code});
    }

    async #isCodeExist(code) {
        return Coupon.findOne({code: code});
    }

    async applyCoupon(book_id, code) {
        const coupon = await this.#isCodeExist(code);
        console.log(coupon)
        let book = coupon.books.find(book => book._id.toString() === book_id);
        if (book) {
            book = await this.bookService.findOne(book_id);
            book.price_after_discount = book.price * (1 - (coupon.discount / 100));
            return book;
        }
        return false;
    }

    async removeOutdatedCoupons() {
        const currentDate = new Date(); // Get the current date and time

        // Find all coupons where the expirationDate is less than the current date
        const outdatedCoupons = await Coupon.find({
            expirationDate: {$lt: currentDate},
        });

        // If there are outdated coupons, delete them one by one
        if (outdatedCoupons.length > 0) {
            for (const coupon of outdatedCoupons) {
                await Coupon.deleteOne({_id: coupon._id});
            }
        }

        // Return the number of outdated coupons that were removed (optional)
        return outdatedCoupons.length;
    }
}

export {CouponService};