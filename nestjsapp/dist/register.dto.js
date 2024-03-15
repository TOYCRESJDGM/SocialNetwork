"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const openapi = require("@nestjs/swagger");
class Register {
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: true, type: () => String }, age: { required: true, type: () => Number }, email: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.Register = Register;
//# sourceMappingURL=register.dto.js.map