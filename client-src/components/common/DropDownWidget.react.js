import React from 'react'
import {DropdownButton , MenuItem , ButtonToolbar , Dropdown} from 'react-bootstrap'
//import Select from 'react-bootstrap-select'
import Select from 'react-select'

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
        onOptionSelected : React.PropTypes.func.isRequired,
        label : React.PropTypes.string,
        defaultSelectedKey : React.PropTypes.string,
        width : React.PropTypes.number
    }



    onOptionChange(newKey){
        let {divId,onOptionSelected,optionKeyToNameMapping}  = this.props;
        //var value = $("#"+divId).selectpicker('val')
        //
        //var selectedKey = null;
        //Object.keys(optionKeyToNameMapping).forEach(function(optionKey){
        //    if(value == optionKeyToNameMapping[optionKey]){
        //        selectedKey = optionKey;
        //    }
        //})

        onOptionSelected(newKey)
    }

    render(){
        const {optionKeyToNameMapping,divId,defaultSelectedKey,width} = this.props;

        if(!width){
            var componentWidth = 200;
        }else{
            var componentWidth = width
        }

        if(defaultSelectedKey == null){
            var defaultKey = Object.keys(optionKeyToNameMapping)[0];
        }else{
            var defaultKey = defaultSelectedKey;
        }

        var options = [];
        Object.keys(optionKeyToNameMapping).forEach(function(optionKey , index){
            var optionName = optionKeyToNameMapping[optionKey];
            return (
                options.push({
                    value : optionKey,
                    label : optionName
                })
            )

        })

        var defaultVal = optionKeyToNameMapping[defaultKey]

        return (
            <div>
                <div style={{position:"relative",top:"-10px","marginRight":"10px",display:"inline-block"}}><b>{this.props.label}</b></div>
                <div style={{width:componentWidth+"px",display:"inline-block"}}>
                    <Select
                        name={divId}
                        searchable={false}
                        clearable={false}
                        value={defaultVal}
                        options={options}
                        onChange={this.onOptionChange}
                    />
                </div>
            </div>
        )
    }
}