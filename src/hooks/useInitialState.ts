export const useAppValue = () => {
  const initialState = {menuVisible: false, setting: {name: 'ABC'}};
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'TOGGLE_MAINMENU': {
        state.menuVisible = action.payload.menuVisible;
        return {...state};
      }

      default:
        throw new Error(`Unknown action: ${action.type}`);
    }
  };
  return {reducer, initialState};
};
export default useAppValue;
