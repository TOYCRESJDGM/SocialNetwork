"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const openapi = require("@nestjs/swagger");
class Login {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.Login = Login;
//# sourceMappingURL=login.dto.js.map