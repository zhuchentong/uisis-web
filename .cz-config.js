'use strict';

module.exports = {
  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  scopes: [],
  types: [
    {
      value: 'wip',
      name: 'ðª  WIP:      ç°å¨åä¸å,ä¸ä¼æ¥çå¹²',
    },
    {
      value: 'feat',
      name: 'â¨  feat:     å¾é«å´æåå®æä¸ä¸ªæ°åè½',
    },
    {
      value: 'fix',
      name: 'ð  fix:      æè®¤ä¸ºæä¿®å¤äºä¸ä¸ªBug',
    },
    {
      value: 'refactor',
      name: 'ð   refactor: æå¯¹ä¸äºä»£ç è¿è¡äºéæ',
    },
    {
      value: 'docs',
      name: 'ð  docs:     ææ´æ°åä¿®æ¹äºææ¡£',
    },
    {
      value: 'test',
      name: 'ð  test:     æåäºåæµè¯æå³çå·¥ä½',
    },
    {
      value: 'chore',
      name: 'ð¯  chore:    ææ²¡æä¿®æ¹srcç®å½,åªæ¯åäºä¸äºé¶æ£çäºæ',
    },
    {
      value: 'style',
      name: 'ð  style:    æä¼åäºä¸äºä»£ç çæ ·å¼é£æ ¼',
    },
    {
      value: 'revert',
      name: 'âª  revert:   æéè¦å»åæ»ä»£ç ',
    },
  ],
};
