"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command = function (assetName, meta) {
    return "import {Seeder} from \"@avanda/orm\"\nimport " + assetName + " from \"../models/" + assetName + "\"\nexport default class implements Seeder{\n    async run(faker: Faker.FakerStatic): Promise<void> {\n        new " + assetName + "().createBulk([\n            /*Create multiple data here*/\n        ])\n    }\n}";
};
exports.default = command;
