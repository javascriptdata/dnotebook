import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

let CodeMirror: any

const api = ["javascript", "markdown", "bash"]

type Props = {
    cellId: string,
    language?: string,
    onLanguageChange?: (language: string) => void,
    content?: string,
    onCellChange?: (cellId: string, content: string, language: string) => void,
    onCellRun?: (cellId: string) => void,
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
        require("codemirror/theme/3024-night.css");
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

    cellChangeHandler(editor: any, data: any, value: string) {
        const language = editor.options.mode
        const { cellId, onCellChange } = this.props
        if (onCellChange) onCellChange(cellId, value, language)
    }

    handleCellRun() {
        const { cellId, onCellRun } = this.props
        if (onCellRun) onCellRun(cellId)
    }

    render() {
        const { render, selectedMode } = this.state
        const { cellId, content } = this.props
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
                    value={content}
                    onChange={this.cellChangeHandler.bind(this)}
                    options={{
                        mode: selectedMode,
                        theme: '3024-night',
                        lineNumbers: true,
                        lineWrapping: true,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        extraKeys: {
                            "Ctrl-Space": "autocomplete",
                        },
                    }}
                />
                <button onClick={this.handleCellRun.bind(this)}>Submit</button>
            </Fragment>
        )
    }
}

CodeEditor.propTypes = {
    cellId: PropTypes.string,
    content: PropTypes.string,
    onCellChange: PropTypes.func,
    onLanguageChange: PropTypes.func,
    language: PropTypes.string,
    handleCellRun: PropTypes.func,
}

CodeEditor.defaultProps = {
    code: '',
    onCellChange: () => { },
    onLanguageChange: () => { },
    language: 'javascript',
}

export default CodeEditor