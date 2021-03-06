import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';

class Content extends PureComponent {
  render() {
    const {
      id,
      fileUrl,
      fileTitle,
      content,
      previewExpanded,
      InlineEditFormComponent,
      SummaryComponent,
      activeTab,
      onFormInit
    } = this.props;

    return (
      <div className="element-editor-content">
        {!previewExpanded && (content || fileUrl) &&
          // Show summary
          <SummaryComponent
            content={content}
            fileUrl={fileUrl}
            fileTitle={fileTitle}
          />
        }
        {previewExpanded &&
          // Show inline editable fields
          <InlineEditFormComponent
            extraClass={{ 'element-editor-editform--collapsed': !previewExpanded }}
            onClick={(event) => event.stopPropagation()}
            elementId={id}
            activeTab={activeTab}
            onFormInit={onFormInit}
          />
        }
      </div>
    );
  }
}

Content.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  fileUrl: PropTypes.string,
  fileTitle: PropTypes.string,
  previewExpanded: PropTypes.bool,
  SummaryComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  InlineEditFormComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Content.defaultProps = {};

export { Content as Component };

export default inject(
  ['ElementSummary', 'ElementInlineEditForm'],
  (SummaryComponent, InlineEditFormComponent) => ({
    SummaryComponent, InlineEditFormComponent,
  }),
  () => 'ElementEditor.ElementList.Element'
)(Content);
