import React, { Component, PropTypes } from 'react'
import ReactMarkdown from 'react-markdown'
import objectAssign from 'object-assign'
import { ModalTrigger, Modal } from 'amazeui-react'
import FileUpload from  'react-fileupload'
import { API_ROOT } from '../../config'


export default class MDEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false,
      showModal: false,
      showImageModal: false
    }
  }
  static defaultProps = {
    enableHTML: true,
    textAreaStyle: {},
    buttonStyle: {},
    buttonContainerStyle: {}
  }

  static propTypes = {
    value: PropTypes.string,
    enableHTML: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    textAreaStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonContainerStyle: PropTypes.object
  }

  setCaretPosition(caretPos) {
    var textarea = this.refs.text;
    if (textarea !== null) {
      if (textarea.createTextRange) {
        var range = textarea.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else {
        if (textarea.selectionStart) {
          textarea.focus();
          textarea.setSelectionRange(caretPos, caretPos);
        } else {
          textarea.focus();
        }
      }
    }
  }

  getSelection(value){
    var cursorIndexStart = this.refs.text.selectionStart;
    var cursorIndexEnd = this.refs.text.selectionEnd;
    var selection = value.substring(cursorIndexStart, cursorIndexEnd);
    return {
      cursorIndexStart: cursorIndexStart,
      cursorIndexEnd: cursorIndexEnd,
      selection: selection
    };
  }

  insertAtCursor(e,markdownLeftOrLR, right, _selection, markdownRight, cursorPosOffset) {
    e.preventDefault();
    if(markdownLeftOrLR == '['){
      this.setState({showModal: true});
    }else if(markdownLeftOrLR == '![]('){
      this.setState({showImageModal: true});
    }else{
      var value = this.props.value;
      var selectionProps = this.getSelection(value);
      var cursorIndexStart = selectionProps.cursorIndexStart;
      var cursorIndexEnd = selectionProps.cursorIndexEnd;
      var selection = _selection ? _selection : selectionProps.selection;
      value = value.substring(0, cursorIndexStart)
        + `${markdownLeftOrLR}${selection.length > 0 ? selection : ''}${right ? markdownRight ? markdownRight :  markdownLeftOrLR : ''}`
        + value.substring(cursorIndexEnd, value.length);
      this.props.onChange(value);
      if (selection.length === 0) {
        setTimeout(()=>{
          this.setCaretPosition(cursorIndexStart + markdownRight ? cursorIndexEnd + cursorPosOffset : markdownLeftOrLR.length);
        }, 0);
      }
    }
    
  }

  handleList(e,ordered){
    e.preventDefault();
    var list = this.getSelection(this.props.value).selection.split(/\r?\n/);
    var newList = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].length > 0) {
        newList.push(`${ordered ? i + 1 + '.' : '-'} ${list[i]}`); 
      }
    }
    newList = newList.join('\n');
    this.insertAtCursor(e,'', false, newList);
  }

  handleYoutube(){
    var url = prompt('Enter a YouTube URL.');
    var videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId === null) {
      return;
    }
    this.insertAtCursor(`[![](https://img.youtube.com/vi/${videoId[1]}/0.jpg)](https://www.youtube.com/watch?v=${videoId[1]}`, true, null, ')', 4);
  }

  handleTextChange(e){
    this.props.onChange(e.target.value);
  }

  toPreView(e,isPreview){
    e.preventDefault();
    this.setState({preview: !isPreview})
  }

  closeLink() {
    this.setState({showModal: false});
  }

  closeImage(){
    this.setState({showImageModal: false});
  }

  handleLink(e){
    e.preventDefault();
    this.setState({showModal: false});
    const linkTitle = this.refs['linkTitle'].value;
    let linkurl = this.refs['linkurl'].value;

    let value = this.props.value;
    if(linkurl.indexOf('http://') < 0){
      linkurl = 'http://' + linkurl;
    }

    var selectionProps = this.getSelection(value);
    var cursorIndexStart = selectionProps.cursorIndexStart;
    var cursorIndexEnd = selectionProps.cursorIndexEnd;
    value = value.substring(0, cursorIndexStart)
       + ' ['+ linkTitle +']('+ linkurl +')'
       + value.substring(cursorIndexEnd, value.length);
    this.props.onChange(value);

    this.refs['linkTitle'].value = '';
    this.refs['linkurl'].value = '';
  }

  _handleUploadSuccess(respArr) {
    this.setState({showImageModal: false});
    var value = this.props.value;
    var selectionProps = this.getSelection(value);
    var cursorIndexStart = selectionProps.cursorIndexStart;
    var cursorIndexEnd = selectionProps.cursorIndexEnd;
    value = value.substring(0, cursorIndexStart)
       + ' !['+ respArr.filename +'](https://'+ respArr.url +')'
       + value.substring(cursorIndexEnd, value.length);
    this.props.onChange(value);
  }


  render() {
    var p = this.props;
    var s = this.state;
    const textAreaStyle = {
      width: '100%',
      //outline: '0',
      border: '1px solid #cccccc',
      height: '500px',
      padding: '4px 8px'
    };
    objectAssign(textAreaStyle, p.textAreaStyle);
    const buttonStyle = {
      //outline: '0',
      border: '1px solid #cccccc',
      margin: '0px 2px',
      padding: '4px 8px',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      marginLeft: '4px',
      lineHeight: '1'
    };
    objectAssign(buttonStyle, p.buttonStyle);
    const buttonContainerStyle = {
      marginLeft: '-4px',
      marginBottom: '4px'
    };
    objectAssign(buttonContainerStyle, p.buttonContainerStyle);

    const options={
        baseUrl:  API_ROOT + 'uploadImage',
        multiple: false,
        accept: 'image/*',
        fileFieldName : 'file',
        chooseAndUpload : true,
        uploadSuccess: this._handleUploadSuccess.bind(this),
    }

     const modal = (
      <Modal title="添加连接">
        <div className="modal-body">
          <div className="form-group">
            <label>标题</label>
            <input type="text" ref={'linkTitle'} className="form-control input-lg c-square" name="title" placeholder="标题名称"/>
          </div>
          <div className="form-group">
            <label>连接 </label>
            <input type="text" ref={'linkurl'} name="link" className="form-control input-lg c-square"  placeholder="http://example.com"/>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary c-btn-square" onClick={(e)=>this.handleLink(e)} role="save">确定</button>
        </div>
      </Modal>);


      const imgModal = (
        <Modal title="图片">
          <div className="modal-body">
            <div >
              <FileUpload options={options}>
                <button ref="chooseAndUpload" className="btn c-theme-btn c-btn-uppercase btn-md c-btn-sbold btn-block c-btn-square">
                  上传图片
                </button>
              </FileUpload>
            </div>
          </div>
        </Modal>
      )


    return (
      <div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e,'**', true)}><i className="fa fa-bold" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e,'_', true)}><i className="fa fa-italic" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e,'### ', false)}><i className="fa fa-header" /></button>
          <button style={buttonStyle} onClick={(e)=>this.handleList(e,false)}><i className="fa fa-list" /></button>
          <button style={buttonStyle} onClick={(e)=>this.handleList(e,true)}><i className="fa fa-list-ol" /></button>
          {p.enableHTML ? <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e,'<blockquote>', true, null, '</blockquote>', 12)}><i className="fa fa-quote-right" /></button> : null}
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '```', true, null, '```', 3)}><i className="fa fa-code" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '[', true, null, ']()', 3)}><i className="fa fa-link" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '![](', true, null, ')', 4)}><i className="fa fa-file-image-o" /></button>
          <button style={buttonStyle} onClick={(e)=>this.toPreView(e, this.state.preview)}><i className={`fa fa-${s.preview ? 'pencil' : 'eye'}`} /><span style={{marginLeft: '6px'}}>{s.preview ? 'Editor' : 'Preview'}</span></button>
        </div>
        <div>
          {s.preview ?
          <ReactMarkdown source={p.value} escapeHtml={!p.enableHTML}/>
          :
          <textarea ref="text" style={textAreaStyle} value={p.value} onChange={this.handleTextChange.bind(this)} placeholder={`使用Markdown ${p.enableHTML ? '或者HTML ' : ''}...`}/>}
        </div>
        {
          this.state.showModal &&
          <ModalTrigger
            modal={modal}
            show={this.state.showModal}
            onClose={this.closeLink.bind(this)}
          />
        }

        {
          this.state.showImageModal &&
          <ModalTrigger
            modal={imgModal}
            show={this.state.showImageModal}
            onClose={this.closeImage.bind(this)}
          />
        }



      </div>
    )
  }
}