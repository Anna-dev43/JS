let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];
let result = filter(whiteList, blackList);

function filter(whiteList, blackList) {
  let filterList = [];
  for (let i = 0; i < whiteList.length; i++) {
    if (!blackList[i].includes(whiteList)) {
      filterList.push(whiteList[i]);
    }
  }
  return filterList;
}

console.log(filterList);
