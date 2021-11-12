import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

let CodeMirror: any

const api = ["javascript", "markdown"]

type Props = {
    language?: string,
    onLanguageChange?: (language: string) => void,
    code?: string,
    onCodeChange?: (code: string, language: string) => void,
}

class CodeEditor extends Component<Props> {
    public static propTypes = {};
    public static defaultProps = {}
    state = {
        render: false,
        selectedMode: null,
    }

    componentDidMount() {
        CodeMirror = require('react-codemirror2')
        require("codemirror/lib/codemirror.css");
        require("codemirror/mode/javascript/javascript");
        require("codemirror/theme/yeti.css");
        require("codemirror/addon/edit/closebrackets");
        require("codemirror/addon/edit/matchbrackets");
        require("codemirror/addon/hint/javascript-hint");
        require("codemirror/addon/hint/show-hint");

        const { language } = this.props
        this.setState({
            render: true,
            selectedMode: language,
        })
    }

    languageChangeHandler(language: string) {
        const { onLanguageChange } = this.props
        this.setState({
            selectedMode: language,
        })
        if (onLanguageChange) onLanguageChange(language)
    }

    codeChangeHandler(editor: any, data: any, value: string) {
        const language = editor.options.mode
        const { onCodeChange } = this.props
        if (onCodeChange) onCodeChange(value, language)
    }

    render() {
        const { render, selectedMode } = this.state
        const { code } = this.props
        if (!render) {
            return null
        }
        const { UnControlled } = CodeMirror
        return (
            <Fragment>
                <select
                    onChange={(e: any) => this.languageChangeHandler(e.target.value)}>
                    {api.map((mode, index) => (
                        <option key={index} value={mode}>{mode}</option>
                    ))}
                </select>
                <UnControlled
                    value={code}
                    onChange={this.codeChangeHandler.bind(this)}
                    options={{
                        mode: selectedMode,
                        theme: 'yeti',
                        lineNumbers: true,
                        lineWrapping: true,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        extraKeys: {
                            "Ctrl-Space": "autocomplete",
                        },
                    }}
                />
            </Fragment>
        )
    }
}

CodeEditor.propTypes = {
    code: PropTypes.string,
    onCodeChange: PropTypes.func,
    onLanguageChange: PropTypes.func,
    language: PropTypes.string,
}

CodeEditor.defaultProps = {
    code: '',
    onCodeChange: () => { },
    onLanguageChange: () => { },
    language: 'javascript',
}

export default CodeEditor