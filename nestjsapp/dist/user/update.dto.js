"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const openapi = require("@nestjs/swagger");
class UpdateUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, age: { required: true, type: () => Number }, email: { required: true, type: () => String } };
    }
}
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=update.dto.js.map