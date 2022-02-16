"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command = function (assetName, meta) {
    return "import {Seeder} from \"@avanda/orm\"\nimport ".concat(assetName, " from \"../models/").concat(assetName, "\"\nexport default class implements Seeder{\n    async run(faker: Faker.FakerStatic): Promise<void> {\n        new ").concat(assetName, "().createBulk([\n            /*Create multiple data here*/\n        ])\n    }\n}");
};
exports.default = command;
