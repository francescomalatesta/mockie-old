let Row = ReactBootstrap.Row;
let Col = ReactBootstrap.Col;
let Button = ReactBootstrap.Button;

class Generator extends React.Component {
    render() {
        let items = this.props.items;

        return <div className="generator">
            <FieldsBox items={items} />

            <hr />

            <OptionsBox />

            <hr />

            <Row>
                <Col md={12}>
                    <Button bsStyle="success" className="generateButton form-control">Generate!</Button>
                </Col>
            </Row>
        </div>
    }
}

class FieldsBox extends React.Component {
    render() {
        return <Row className="fieldsBox">
            <Col md={7}>
                <h2>Fields</h2>
                <p>Here you can specify everything about the fields you want to generate.</p>
                <FieldsList items={this.props.items} />
            </Col>
            <Col md={5}>
                <h2>Preview</h2>
                <p>Don't risk! Here's a preview of what are going to get.</p>
                <Previewer />
            </Col>
        </Row>
    }
}

class FieldsList extends React.Component {
    render() {
        let items = this.props.items;

        return <div className="fieldsList little-separated">
            {items.map(function (item) {
                return <Field key={item.id} data={item} />;
            })}

            <AddFieldButton />
        </div>
    }
}

class AddFieldButton extends React.Component {
    render() {
        return <Button bsStyle="success" className="addFieldButton form-control" onClick={() => store.dispatch({ type: 'ADD_FIELD' })}>+ Add Field</Button>
    }
}

class Field extends React.Component {
    render() {
        let data = this.props.data;

        return <Row className="field">
            <Col md={5}>
                <input type="text" className="form-control" placeholder="Field Name..." />
            </Col>
            <Col md={5}>
                <Button bsStyle="info" className="form-control">Choose Type</Button>
            </Col>
            <Col md={2}>
                <Button bsStyle="danger" className="form-control" onClick={() => store.dispatch({ type: 'REMOVE_FIELD', id: data.id })}>Remove</Button>
            </Col>
        </Row>
    }
}

class Previewer extends React.Component {
    render() {
        return <pre className="previewer little-separated">
            {JSON.stringify({
                "first_name": "Francesco",
                "last_name": "Malatesta",
                "email_address": "francescomalatesta@live.it"
            }, null, 2) }
        </pre>
    }
}

class OptionsBox extends React.Component {
    render() {
        return <Row className="optionsBox">
            <Col md={6}>
                <h3>Count</h3>
                <p>How many items you want to generate?</p>
                <input type="text" placeholder="Count..." className="form-control" />
            </Col>
            <Col md={6}>
                <h3>Output Format</h3>
                <p>Choose the desired format for your random data.</p>
                <select className="form-control">
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                </select>
            </Col>
        </Row>
    }
}


function reducer (items = [{id: 1, name: '', type: null}], action) {
    switch (action.type){
        case 'ADD_FIELD':
            return [
                ...items,
                {
                    id: items.length + 1,
                    name: '',
                    type: null
                }
            ];
            break;
        case 'REMOVE_FIELD':
            let newItems = [...items];

            if(items.length > 1) {
                newItems.splice(
                    newItems.findIndex((item) => {
                        return item.id == action.id;
                    }), 1
                );

                return newItems;
            }

            return newItems;
            break;
        default:
            return items;
            break;
    }
}

const store = window.Redux.createStore(reducer);

function render() {
    ReactDOM.render(
        <Generator items={store.getState()} />,
        document.getElementById('application')
    );
}

render();
store.subscribe(render);
