import { verifiedWidgetData } from './data.verification';

export function getVerifiedWidgetsData(widgets: Array<any>) {
  const verifiedWidgets = widgets.filter((widget, index) => {
    // general structure tests (for all widgets)
    // test name property
    let isValid = widget && widget.name && typeof widget.name === 'string';
    // test data property
    isValid = isValid && widget.data;
    if (Array.isArray(widget.data)) {
      isValid = isValid && widget.data.length > 0;
    } else {
      isValid = isValid && typeof widget.data === 'object';
    }
    // TODO
    // add checks per widget (switch) here
    isValid = isValid && verifiedWidgetData(widget);
    if (!isValid) {
      console.warn(`Invalid widget ${widget.name} [index: ${index}]: `, widget);
    }
    return isValid;
  });
  return verifiedWidgets;
}
