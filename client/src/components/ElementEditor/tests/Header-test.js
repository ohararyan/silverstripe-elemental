/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Header } from '../Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  const ElementActionsComponent = () => <div />;
  const testTabs = ['Content', 'Settings', 'History'];

  describe('render()', () => {
    it('should render the icon', () => {
      const wrapper = shallow(
        <Header
          id={'11'}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.instance().props.id).toBe('11');
      expect(wrapper.find('i.font-icon-block-file')).toHaveLength(1);
      expect(wrapper.find('#element-editor-header__icon11')).toHaveLength(1);
    });

    it('should render the title', () => {
      const wrapper = shallow(
        <Header
          id={'12'}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          editTabs={testTabs}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.instance().props.id).toBe('12');
      expect(wrapper.text()).toContain('Sample File Block');
    });

    it('should contain a Tooltip', () => {
      const wrapper = shallow(
        <Header
          id={'13'}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          editTabs={testTabs}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.instance().props.id).toBe('13');
      expect(wrapper.find('Tooltip').length).toBe(1);
      expect(wrapper.instance().props.elementType).toBe('File');
    });

    it('should render a "right caret" button when not expandable', () => {
      const wrapper = shallow(
        <Header
          expandable={false}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-right-open-big')).toBe(true);
    });

    it('should render a "down caret" button when not expanded', () => {
      const wrapper = shallow(
        <Header
          expandable
          previewExpanded={false}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-down-open-big')).toBe(true);
    });

    it('should render an "up caret" button when expanded', () => {
      const wrapper = shallow(
        <Header
          expandable
          previewExpanded
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-up-open-big')).toBe(true);
    });

    it('should render an ElementActions component when the element is expandable', () => {
      const wrapper = shallow(
        <Header
          expandable
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.text()).toContain('ElementActionsComponent');
    });

    it('should not render an ElementActions when the element is not expandable', () => {
      const wrapper = shallow(
        <Header
          expandable={false}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.text()).not.toContain('ElementActionsComponent');
    });
  });

  describe('renderVersionedStateMessage()', () => {
    it('identifies draft versions', () => {
      const wrapper = shallow(
        <Header
          ElementActionsComponent={ElementActionsComponent}
          isPublished={false}
          isLiveVersion={false}
        />
      );

      const versionedState = wrapper.find('.element-editor-header__version-state');
      expect(versionedState.prop('title')).toContain('not been published');
      expect(versionedState.hasClass('element-editor-header__version-state--draft')).toBe(true);
    });

    it('identifies modified versions', () => {
      const wrapper = shallow(
        <Header
          ElementActionsComponent={ElementActionsComponent}
          isPublished
          isLiveVersion={false}
        />
      );

      const versionedState = wrapper.find('.element-editor-header__version-state');
      expect(versionedState.prop('title')).toContain('has unpublished changes');
      expect(versionedState.hasClass('element-editor-header__version-state--modified')).toBe(true);
    });

    it('ignores live versions', () => {
      const wrapper = shallow(
        <Header
          ElementActionsComponent={ElementActionsComponent}
          isPublished
          isLiveVersion
        />
      );

      expect(wrapper.find('.element-editor-header__version-state').length).toBe(0);
    });
  });
});
