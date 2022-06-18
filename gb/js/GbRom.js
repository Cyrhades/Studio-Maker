class GbRom
{
    getHeaderChecksum(hexString) {
        var checksum1 = 0;
        var checksum2 = 0;
        for (let x=0; x < hexString.length; x+=2) {
            let carry = 0;
            checksum2 += (15-parseInt("0x" + hexString[x + 1]));
            if (checksum2 > 15) { checksum2 -= 16;  carry = 1; }

            checksum1 += (15-parseInt("0x" + hexString[x])) + carry;
            if (checksum1 > 15) checksum1 -= 16;
        }
        return checksum1.toString(16).toUpperCase()+checksum2.toString(16).toUpperCase();
    }

    downloadROM(name, fieldData) {
        hexData = calculateHeaderChecksum(fieldData);
        // fill up the rest of the 32kb rom with 0xFF
        for (let i = 0; i < 32432; i++) {
            hexData += "FF";
        }
        let byteArray = new Uint8Array(hexData.length / 2);
        for (let x=0; x < byteArray.length; x++) {
            byteArray[x] = parseInt(hexData.substr(x*2, 2), 16);
        }
        let data = new Blob([byteArray], { type: "application/octet-stream" });
        textFile = window.URL.createObjectURL(data);        
    }
}