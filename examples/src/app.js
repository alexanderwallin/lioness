import React from 'react';
import ReactDOM from 'react-dom';

import { LionessProvider, T, withLocalization } from '../../src/index.js';

const messages = {
  "en": {
    "charset": "utf-8",
    "headers": {
      "project-id-version": "club-admin",
      "pot-creation-date": "Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)",
      "po-revision-date": "2016-04-22 10:01+0000",
      "last-translator": "lagetse.teamcity <micke@miklar.se>",
      "language-team": "English (http://www.transifex.com/lagetse/club-admin/language/en/)",
      "content-type": "text/plain; charset=UTF-8",
      "content-transfer-encoding": "8bit",
      "language": "en",
      "plural-forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:"
          },
          "msgstr": [
            "Project-Id-Version: club-admin\nPOT-Creation-Date: Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)\nPO-Revision-Date: 2016-04-22 10:01+0000\nLast-Translator: lagetse.teamcity <micke@miklar.se>\nLanguage-Team: English (http://www.transifex.com/lagetse/club-admin/language/en/)\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\nLanguage: en\nPlural-Forms: nplurals=2; plural=(n != 1);\n"
          ]
        },
        "Close": {
          "msgid": "Close",
          "comments": {
            "reference": "./src/filtering/components/FilterBox.jsx:29"
          },
          "msgstr": [
            "Close"
          ]
        },
      }
    }
  },
  "sv": {
    "charset": "utf-8",
    "headers": {
      "project-id-version": "club-admin",
      "pot-creation-date": "Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)",
      "po-revision-date": "2016-04-22 10:02+0000",
      "last-translator": "Alexander Wallin <alexander.wallin@laget.se>",
      "language-team": "Swedish (http://www.transifex.com/lagetse/club-admin/language/sv/)",
      "content-type": "text/plain; charset=UTF-8",
      "content-transfer-encoding": "8bit",
      "language": "sv",
      "plural-forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nAlexander Wallin <alexander.wallin@laget.se>, 2016"
          },
          "msgstr": [
            "Project-Id-Version: club-admin\nPOT-Creation-Date: Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)\nPO-Revision-Date: 2016-04-22 10:02+0000\nLast-Translator: Alexander Wallin <alexander.wallin@laget.se>\nLanguage-Team: Swedish (http://www.transifex.com/lagetse/club-admin/language/sv/)\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\nLanguage: sv\nPlural-Forms: nplurals=2; plural=(n != 1);\n"
          ]
        },
        "Close": {
          "msgid": "Close",
          "comments": {
            "reference": "./src/filtering/components/FilterBox.jsx:29"
          },
          "msgstr": [
            "Stäng"
          ]
        },
      }
    }
  }
};

//
let MyThing = ({ t, message }) =>
  <p>{t(message)}</p>;

MyThing = withLocalization(MyThing);

// A clickable number
const ClickableNumber = () =>
  <em onClick={() => console.log('click')}>131</em>;

/**
 * Example app
 */
const App = () =>
  <LionessProvider locale="en" messages={messages}>
    <div className="App">
      <T message="Clap {{ num }} times" num={<ClickableNumber />} />
      <MyThing message="Close" />
    </div>
  </LionessProvider>;

ReactDOM.render(<App />, document.querySelector('#app'));