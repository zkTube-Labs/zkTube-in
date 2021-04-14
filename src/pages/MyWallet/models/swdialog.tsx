
export default {
    state: {
      visible:false  
    },
    reducers: {
      update(prevState, payload) {
        return { ...prevState, ...payload };
      }
    },
    effects: (dispatch) => ({
      async setVisible(visibleState) {
        dispatch.swdialog.update(visibleState)
      }
    })
  }