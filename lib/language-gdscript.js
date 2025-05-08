'use babel';

import LanguageGdscriptView from './language-gdscript-view';
import { CompositeDisposable } from 'atom';

export default {

  languageGdscriptView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageGdscriptView = new LanguageGdscriptView(state.languageGdscriptViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageGdscriptView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-gdscript:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageGdscriptView.destroy();
  },

  serialize() {
    return {
      languageGdscriptViewState: this.languageGdscriptView.serialize()
    };
  },

  toggle() {
    console.log('LanguageGdscript was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
