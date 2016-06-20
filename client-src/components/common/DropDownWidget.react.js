import React from 'react'
import {DropdownButton , MenuItem , ButtonToolbar , Dropdown} from 'react-bootstrap'
import Select from 'react-bootstrap-select'

export default class DropDownWidget extends React.Component{

    constructor(props){
        super(props);
        this.onOptionChange = this.onOptionChange.bind(this);

    }

    componentDidMount(){

        let {divId}  = this.props;
        $("#"+divId).selectpicker();

        $("#"+divId).change(this.onOptionChange);
    }

    componentDidUpdate(){
        let {divId}  = this.props;
        $("#"+divId).selectpicker();
    }

    static propTypes = {
        divId : React.PropTypes.string.isRequired,
        optionKeyToNameMapping : React.PropTypes.object.isRequired,
        onOptionSelected : React.PropTypes.func.isRequired
    }



    onOptionChange(e){
        let {divId,onOptionSelected,optionKeyToNameMapping}  = this.props;
        var value = $("#"+divId).selectpicker('val')

        var selectedKey = null;
        Object.keys(optionKeyToNameMapping).forEach(function(optionKey){
            if(value == optionKeyToNameMapping[optionKey]){
                selectedKey = optionKey;
            }
        })

        onOptionSelected(selectedKey)
    }

    render(){
        const {optionKeyToNameMapping,divId} = this.props;
        var options = null;
        options = Object.keys(optionKeyToNameMapping).map(function(optionKey , index){
            var optionName = optionKeyToNameMapping[optionKey];
            return (
                <option key={index}>{optionName}</option>
            )

        })

        var defaultKey = Object.keys(optionKeyToNameMapping)[0];
        var defaultVal = optionKeyToNameMapping[defaultKey]

        return (
            <div>
                <div style={{top:"10px","marginRight":"10px",display:"inline-block"}}><b>Select Device:</b></div>
                <div style={{width:"150px",display:"inline-block"}}>
                    <select className="selectPicker form-control input-small" id={divId} defaultValue={defaultVal}>
                        {options}
                    </select>
                </div>
            </div>
        )
    }
}