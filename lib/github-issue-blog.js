'use babel';

import { CompositeDisposable } from 'atom'
import github from './api'
import defaultConfig from './config'

export default {

  subscriptions: null,
  config: defaultConfig,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'github-issue-blog:create-issue': () => this.createIssue()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {

  },


  createIssue() {
    let config = this.getConfig();
    for (var p in config) {
      if (config.hasOwnProperty(p)) {
        if(!config[p]){
          atom.notifications.addWarning(`no ${p}`)
          return;
        }
      }
    }
    let editor = atom.workspace.getActiveTextEditor()
    let text = editor.buffer.getText()
    if (!text.length || !text.match(/./)) {
      return
    }
    let issue = {
      title: this.getTitle(text),
      body: text
    }

    github(config, issue)
      .then(() => {
      atom.notifications.addSuccess('create issue successful!')
    }).catch(error => {
      atom.notifications.addWarning(String(error))
    })

  },

  getConfig() {
    return {
      userName: atom.config.get('github-issue-blog.userName'),
      repo: atom.config.get('github-issue-blog.repo'),
      token: atom.config.get('github-issue-blog.token')
    }
  },

  getTitle(text) {
    let matches = text.match(/^#[^#]+\n/) || text.match(/.+/)
    if (matches && matches.length) {
      return matches[0]
    }
  }
};
