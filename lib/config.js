'use babel';

export default {
  userName: {
    title: 'UserName',
    description: 'The UserName of your github',
    type: 'string',
    default: '',
    order: 0
  },
  repo: {
    title: 'Repository',
    description: 'The repository in which we want to create the issue.',
    type: 'string',
    default: '',
    order: 1
  },
  token: {
    title: 'Personal Access Token',
    description: 'Your Personal Access Token',
    type: 'string',
    default: '',
    order: 2
  }
};
