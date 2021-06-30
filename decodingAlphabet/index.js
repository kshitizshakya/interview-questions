function decodeTest(word) {
    const wlength = word?.length || 0;
  
    const firstIndex = parseInt(word[0]);
  
    const wordInt = parseInt(word);
  
    const consolidateArray = (iteratorableItem, ele) =>
      iteratorableItem.map((item) => {
        if (item instanceof Array) {
          return [ele, ...item];
        }
        return [ele, item];
      });
  
    if (wlength <= 0 || firstIndex === 0 || wordInt <= 0 || word.match(/\D+/g)) {
      return [];
    }
  
    if (wlength == 1 && firstIndex !== 0) {
      return [wordInt];
    }
  
    if (wlength == 2) {
      if (wordInt > 0 && wordInt <= 26 && parseInt(word[1]) === 0) {
        return [wordInt];
      }
      const data = [];
      data.push([firstIndex, ...decodeTest(word.slice(1))]);
  
      if (wordInt < 27) {
        data.push(wordInt);
      }
  
      return data;
    }
  
    if (wlength >= 3) {
      const firstPair = consolidateArray(decodeTest(word.slice(1)), firstIndex);
      let secondPair = [];
      if (parseInt(word.slice(0, 2)) < 27)
        secondPair = consolidateArray(
          decodeTest(word.slice(2)),
          parseInt(word.slice(0, 2))
        );
  
      return [...firstPair, ...secondPair];
    }
  }
  
  function displayCode(arr) {
      const alphabetStartASCII = 64;
      return arr.reduce((acc = [], curr) => {
      let newCode =
        curr instanceof Array
          ? curr
              .map((item) => String.fromCharCode(alphabetStartASCII + item))
              .join('')
          : String.fromCharCode(alphabetStartASCII + item);
  
      acc.push(newCode);
      return acc;
    }, []);
  }
  
  function TestDecoding() {
    const result = decodeTest("123");
    console.log("result", displayCode(result));
  }
  
  TestDecoding();
