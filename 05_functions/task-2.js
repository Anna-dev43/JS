let whiteListArr = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackListArr = ['jsfunc@mail.ru','goodday@day.ru'];

function filter(whiteList, blackList) {
  let filterList = [];
  for (let i = 0; i < whiteList.length; i++) {
    if (!blackList.includes(whiteList[i])) {
      filterList.push(whiteList[i]);
    }
  }
  return filterList;
}

let result = filter(whiteListArr, blackList);
console.log(result);
