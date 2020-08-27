import { Injectable } from '@nestjs/common';

const xlsx = require("xlsx");

@Injectable()
export class SharedService {
    async excelToJSON(fileData): Promise<any> {
        var result = xlsx.read(fileData, {
            type: "buffer",
        });
        const excelData = result.Sheets.Sheet1;
        const keys = Object.keys(result.Sheets.Sheet1);

        keys.splice(keys.indexOf("!ref"), 1);
        keys.splice(keys.indexOf("!margins"), 1);

        const table = [];

        const columns = [];

        const headerIndex = parseInt(
            keys[0].substring(keys[0].length - 1, keys[0].length)
        );
        var i = 0;
        for (; i < keys.length; i++) {
            if (
                headerIndex ===
                parseInt(keys[i].substring(keys[i].length - 1, keys[i].length))
            ) {
                columns.push(keys[i].substring(0, keys[i].length - 1));
            } else {
                break;
            }
        }

        let currentIndex = headerIndex + 1;

        var record = {};
        for (var j = 0; i < keys.length; i++, j++) {
            if (columns.length == j) {
                table.push(record);
                record = {};
                j = 0;
                currentIndex++;
            }
            if (excelData[columns[j] + currentIndex]) {
                record[excelData[columns[j] + headerIndex].v] =
                    excelData[columns[j] + currentIndex].v;
            } else {
                record[excelData[columns[j] + headerIndex].v] = null;
                i--;
            }
        }
        table.push(record);

        return table;
    };
}
