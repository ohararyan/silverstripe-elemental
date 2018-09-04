import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';
import AddElementPopoverContent from 'components/ElementEditor/AddElementPopoverContent';
import { elementTypeType } from 'types/elementTypeType';

class ElementList extends Component {
  /**
   * Given an elementType, return a list of tabs that should be available in the edit form for an
   * element.
   *
   * @param {elementTypeType} element
   * @returns {string[]}
   */
  getEditTabs(element) {
    const { elementTypes } = this.props;
    const matchingType = elementTypes.find(type => element.BlockSchema.type === type.title);

    if (!matchingType || !matchingType.tabs) {
      return [];
    }

    return matchingType.tabs;
  }

  /**
   * Renders a list of Element components, each with an elementType object
   * of data mapped into it. The data is provided by a GraphQL HOC registered
   * in registerTransforms.js.
   */
  renderBlocks() {
    const { ElementComponent, blocks } = this.props;

    if (!blocks) {
      return null;
    }


    return blocks.map((element) => (
      <ElementComponent
        key={element.ID}
        element={element}
        editTabs={this.getEditTabs(element)}
        link={element.BlockSchema.actions.edit}
      />
    ));
  }

  /**
   * Renders a loading component
   *
   * @returns {LoadingComponent|null}
   */
  renderLoading() {
    const { loading, LoadingComponent } = this.props;

    if (loading) {
      return <LoadingComponent />;
    }
    return null;
  }

  render() {
    const { elementTypes } = this.props;
    return (
      <div className="elemental-editor__list">
        {this.renderLoading()}
        {this.renderBlocks()}
        <AddElementPopoverContent elementTypes={elementTypes} />
      </div>
    );
  }
}

ElementList.propTypes = {
  // @todo support either ElementList or Element children in an array (or both)
  blocks: PropTypes.arrayOf(elementType),
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  loading: PropTypes.bool,
};

ElementList.defaultProps = {
  blocks: [],
  loading: false,
};

export { ElementList as Component };

export default inject(
  ['Element', 'Loading'],
  (ElementComponent, LoadingComponent) => ({
    ElementComponent,
    LoadingComponent,
  }),
  () => 'ElementEditor.ElementList'
)(ElementList);
