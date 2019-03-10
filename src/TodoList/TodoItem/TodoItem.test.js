<Consumer>
{ context => {
    context.data.items.map((item, index) => {
        return (
            <div className="todo-item" key={item.id} index={index}>
                <input type="checkbox" name="checked" checked={item.checked} onChange={() => context.actions.changed(item.id)}/>
                <p style={item.checked ? completedStyle : null }>{item.todo}</p>
                <button onClick={() => context.actions.del(item.id)}>Delete</button>
                <button onClick={() => context.actions.edit(item.id)}>Edit</button>
            </div>
        )
    })
}
}
</Consumer>
