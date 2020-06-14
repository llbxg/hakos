function check(filePath) {
    let isExist = false;
    try {
      fs.readFileSync(filePath);
      isExist = true;
    } catch(err) {
      isExist = false;
    }
    return isExist;
}