class TimersDashboard extends React.Component {
    state = {
        timers: [
            {
                title: 'Practice squat',
                project: 'Gym chores',
                id: uuid.v4(),
                elapsed: 5456009,
                runningSince: Date.now(),
            },
            {
                title: 'Bake squash',
                project: 'Kitchen chores',
                id: uuid.v4(),
                elapsed: 2349908,
                runningSince: null,
            },
        ],
    };
    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };
    createTimer = (timer) => {
        const t = helpers.newTimer(timer);
        this.setState({
            timers:this.state.timers.concat(t),
        });
    };

    render() {
        const {timers} = this.state;
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList
                        timers={timers}
                    />
                    <ToggleableTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                    />
                </div>
            </div>
        );
    }
}

class EditableTimerList extends React.Component {
    render() {
        const timers = this.props.timers.map((timer) => (
                <EditableTimer
                    key={timer.id}
                    id={timer.id}
                    title={timer.title}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    runningSince={timer.runningSince}
                />
            )
        );
        return (
            <div id='timers'>
                {timers}
            </div>
        );
    }
}

class EditableTimer extends React.Component {
    state = {
        editFormOpen: false,
    }

    render() {
        const {title, project, elapsed, runningSince, id} = this.props;
        const {editFormOpen} = this.state;
        if (editFormOpen) {
            return (
                <TimerForm
                    id={id}
                    title={title}
                    project={project}
                />
            );
        } else {
            return (
                <Timer
                    id={id}
                    title={title}
                    project={project}
                    elapsed={elapsed}
                    runningSince={runningSince}
                />
            );
        }
    }
}

class TimerForm extends React.Component {

    state = {
        title: this.props.title || '',
        project: this.props.project || '',
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    };
    handleProjectChange = (e) => {
        this.setState({project: e.target.value});
    };
    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        });
    };

    render() {
        const {title, project} = this.state;
        const {onFormClose, id} = this.props;
        const submitText = id ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input type='text' value={title}
                                   onChange={this.handleTitleChange}/>
                        </div>
                        <div className='field'>
                            <label>Project</label>
                            <input type='text' value={project}
                                   onChange={this.handleProjectChange}/>
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button className='ui basic blue button'
                                    onClick={this.handleSubmit}>
                                {submitText}
                            </button>
                            <button className='ui basic red button'
                                    onClick={onFormClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false,
    }

    handleFormOpen = () => {
        this.setState({isOpen: true});
    };
    handleFormClose = () => {
        this.setState({isOpen: false});
    };
    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({isOpen: false})
    };

    render() {
        const {isOpen} = this.state;
        if (isOpen) {
            return (
                <TimerForm
                onFormSubmit={this.handleFormSubmit}
                onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (<div className='ui basic content center aligned segment'>
                <button className='ui basic button icon'
                        onClick={this.handleFormOpen}>
                    <i className='plus icon'/>
                </button>
            </div>);
        }
    }
}

class Timer extends React.Component {
    render() {
        const {title, project} = this.props;
        const elapsedString = helpers.renderElapsedString(this.props.elapsed);
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>
                        {title}
                    </div>
                    <div className='meta'>
                        {project}
                    </div>
                    <div className='center aligned description'>
                        <h2>{elapsedString}</h2>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon'>
                            <i className='edit icon'/>
                        </span>
                        <span className='right floated trash icon'>
                            <i className='trash icon'/>
                        </span>
                    </div>
                </div>
                <div className='ui bottom attached blue basic button'>
                    Start
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TimersDashboard/>,
    document.getElementById('content')
);