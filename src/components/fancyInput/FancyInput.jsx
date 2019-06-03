import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './FancyInput.scss';

class FancyInput extends React.Component {
    render() {
        const {placeholder, glyph, ...inputOpts} = this.props;
        return (
            <div class="group">
                    <input {...inputOpts} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>
                        {glyph ? <Glyphicon glyph={glyph} /> : null}
                        <span className="placeholder">{placeholder}</span>
                    </label>
            </div>
        );
    }
}

export default FancyInput;