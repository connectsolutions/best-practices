 <a id="top"></a>
# COSO HTML, CSS & SASS CODING STYLE GUIDE

## Table of Contents
* [Introduction](#introduction)
* [HTML, CSS & SASS GENERAL FORMATTING RULES](#general)
 * [Indentation and Whitespace](#whitespace)
 * [Capitalization](#capitalization)
 * [Commenting](#commenting)
 * [Separation of Concerns](#concerns)
 * [Practicality over purity](#practicality)

* [HTML CODING STYLE GUIDE](#html)
 * [Use Valid HTML](#html-valid)
 * [Doctype](#doctype)
 * [Character Encoding](#utf8)
 * [IE Compatibility](#ie-compatibility)
 * ['Type' Attributes](#type-attributes)
 * [Use External Stylesheets](#no-inline-css)
 * [General HTML Formatting](#html-formatting)
 * [Double vs Single Quotes](#html-quotes)
 * [Closing Tags](#closing-tags)

* [CSS CODING STYLE GUIDE](#css)
 * [Use Valid CSS](#css-valid)
 * [CSS File Organization](#css-files)
 * [CSS Text Formatting](#css-formatting)
 * [One Thing Per Line](#css-lines)
 * [Property-Value Pairs](#css-properties)
 * [Don't use IDs in CSS.](#css-ids)
 * [Class Naming](#css-classes)
 * [About BEM](#bem)
 * [Keep Specificity Low](#css-specificity)
 * [CSS Commenting](#css-commenting)
 * [Media query placement](#css-media-queries)

* [SASS CODING STYLE GUIDE](#sass)
 * [Use Valid SCSS](#scss-valid)
 * [.scss File Organization](#scss-files)
 * [SASS Code Organization](#scss-code)
 * [SASS Naming Conventions](#scss-naming)
 * [SASS Nesting](#scss-nesting)
 * [Working with Colors](#scss-colors)

* [Sources & Inspiration](#sources)


## Introduction
* A coding styleguide is a valuable tool for teams to meet our manifesto of _"All Code Shall Appear to Be Written By a Single Person"_.
* A good styleguide, when well followed, will
 * set the standard for code quality across a codebase;
 * promote consistency across codebases;
 * give developers a feeling of familiarity across codebases;
 * increase productivity.

* These guidelines work well for teams but really all developers should strive for consistency within their own code as well.
* Note, this document is not a _pattern library_ of visual elements but rather a collection of best practices for _how to write code_ in HTML, CSS and SASS/SCSS.

<br><br>
[_table of contents_](#top)
<a id="general"></a>


----
# GENERAL FORMATTING RULES (HTML, CSS & SASS)

<a id="whitespace"></a>
## Indentation and Whitespace
* Indent by 2 spaces at a time.
* Don’t use tabs or mix tabs and spaces for indentation.
* Use whitespace meaningfuly and consitently.
* Remove trailing white spaces. They are unnecessary and can complicate diffs.

<a id="capitalization"></a>
## Capitalization
* All code should be lowercase. This applies to HTML element names, attributes, attribute values, CSS selectors, CSS class names, properties, and property values (as much as possible).
* CSS classes are lowercase separated by a dash.  See [Class Naming](#css-classes).
* SASS variables are lowercase separated by a dash. See [SASS Naming](#scss-naming).
* Exceptions:
 * HTML property values may be mixed case, e.g. <i>&lt;div title="Welcome to Coso"></i>
 * The ID attribute of an HTML element should be lowerCamelCase, e.g. <i>&lt;div id="pageTitle"></i>, because this is used for JavaScript only.

<a id="commenting"></a>
## Commenting
* Leaving comments for your coworkers (and yourself!) is encouraged.
* Where code does not explain itself sufficiently, use comments: What does it cover, what purpose does it serve, why is respective solution used or preferred?

<a id="concerns"></a>
## Separation of Concerns
* Strictly keep structure (markup), presentation (styling), and behavior (scripting) apart, and try to keep the interaction between the three to an absolute minimum.
 * That is, make sure documents and templates contain only HTML and HTML that is solely serving structural purposes. Move everything presentational into style sheets, and everything behavioral into scripts.
 * In addition, keep the contact area as small as possible by linking as few style sheets and scripts as possible from documents and templates.

<a id="practicality"></a>
### Guiding philsophy: practicality over purity
* Strive to maintain HTML/CSS/SASS standards and semantics, but not at the expense of practicality.
* Use the least amount of markup with the fewest intricacies whenever possible.
* Removing code is just as much a contribution as adding code is.

<br><br>
[_table of contents_](#top)
<a id="html"></a>


----
# HTML CODING STYLE GUIDE

<a id="html-valid"></a>
## Use valid HTML
* Use valid HTML code.
* Use tools such as the <a href="http://validator.w3.org/#validate_by_input" target="_blank">W3C HTML validator</a> to test.

<a id="doctype"></a>
##  Doctype
* Use the HTML5 doctype at the beginning of any Web Page.
* Use lowercase.  Nothing else in HTML5 is uppercase.
```html
<!doctype html>
```

<a id="utf8"></a>
## Character Encoding
* Use UTF-8 (no BOM). Make sure your editor uses UTF-8 as character encoding, without a byte order mark.
* Specify the encoding at the beginning of any Web Page
```html
<meta charset="utf-8">
```

<a id="ie-compatibility"></a>
## IE compatibility mode
* Internet Explorer supports the use of a document compatibility <meta> tag to specify what version of IE the page should be rendered as. Unless circumstances require otherwise, it's most useful to instruct IE to use the latest supported mode with edge mode.
```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

<a id="type-attributes"></a>
## type Attributes
* Do not use type attributes for style sheets (unless not using CSS) and scripts (unless not using JavaScript).
 * Specifying type attributes in these contexts is not necessary as HTML5 implies text/css and text/javascript as defaults. This can be safely done even for older browsers.
```html
<!-- Not recommended -->
<link rel="stylesheet" type="text/css" href="//www.google.com/css/maia.css">
<!-- Recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">
```

<a id="no-inline-css"></a>
## Use External Stylesheets
* Do not write inline styles into HTML. The specificity is too high. Inlining styles is most likely avoidable.
```html
<!-- avoid this -->
<div style="display:none">
<!-- DO do this -->
<div class="start-hidden">
```
* Avoid embedded styles written into HTML. It's best to have all the static styles in our SCSS files structure. Embedding styles is most likely avoidable.
* It is ok to use JavaScript to manage inline styles on an element directly, however ONLY when it is impossible to have a prewritten CSS class to do the job. This should be considered a technique of last recourse.
 * For example modifying an element's height relative to the viewport height.


<a id="html-formatting"></a>
## General HTML Formatting
* Use a new line for every block, list, or table element
* Indent all children elements.
* When it is more readable, an element may be opened and closed on the same line. &lt;th>, &lt;td>,  &  &lt;li> are good examples of elements that work well opened and closed on the same line.
```html
<table>
  <thead>
    <tr>
      <th scope="col">Income</th>
      <th scope="col">Taxes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>$ 5.00</td>
      <td>
        <ul>
          <li>Item one</li>
          <li>Item Two</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
```

<a id="html-quotes"></a>
## Double vs Single Quotes
* In HTML, always use double quotes, never single quotes, on attributes.
```html
<img class="logo-big" title="Connect Solutions Logo">
```

<a id="closing-tags"></a>
## Closing Tags
* Don't include a trailing slash in self-closing elements—the HTML5 spec says they're optional.  E.g. don't do this:
```html
<!-- don't do these -->
<br/>
<br />
<!-- DO do this -->
<br>
```
* Don’t omit optional closing tags (e.g. &lt;/li> or &lt;/body>).

<br><br>
[_table of contents_](#top)
<a id="css"></a>


----
# CSS Coding Style Guide

<a id="css-valid"></a>
## Use Valid CSS
* Use valid CSS where possible.  (Valid SCSS is valid CSS, so if you lint your SCSS you should be good here.)
* Use tools such as the <a href="http://jigsaw.w3.org/css-validator/" target="_blank">W3C CSS validator</a> to test.

<a id="css-files"></a>
## CSS File Organization
* See [SCSS file Organization](#scss-files)

<a id="css-formatting"></a>
## Basic Text Formatting
* Two (2) space indents, no tabs;
* Meaningful use of whitespace.
* Everything lowercase.
* Use single ('') rather than double ("") quotation marks for attribute selectors or property values.
* Do not use quotation marks in URI values (url()).

<a id="css-lines"></a>
### One Thing Per Line
* Each item in a comma-separated list should be on its own line. Selectors, for example, should be on a single line, with a space only after the last selector, followed by an opening brace '{'.
* A selector block should end with a closing curly brace '}' that is unindented and on a separate line.
```css
.top,
.middle,
.bottom {
  margin-right: 10px;
  background-color: #efefef;
  border: 1px solid #eee;
}
```

* A blank line should be placed between each selector block.

<a id="css-properties"></a>
### Property-Value Pairs
* Property-value pairs should be listed starting on the line after the opening curly brace. Each pair should:
 * be on its own line;
 * be indented one level (2 spaces);
 * have a single space after the colon that separates the property name from the property value; and
 * end in a semicolon (even the last one in a list).
```css
selector {
  name: value;
  name: value;
  name: value;
}
```

# 0 and Units

* Omit unit specification after “0” (zero) values.  Do not use units after 0 values unless they are required.
```css
margin: 0;
padding: 0;
```

<a id="css-specifiers"></a>
## CSS Specifiers & Naming Conventions

<a id="css-ids"></a>
### Don't use IDs in CSS.
* Use classes only.
* In CSS, there is literally no point in them, and they only ever cause harm.  See http://cssguidelin.es/#ids-in-css
> Not only are IDs inherently non-reusable, they are also vastly more specific than any other selector, and therefore become specificity anomalies. One thousand chained classes cannot override the specificity of a single ID.  If we want to keep specificity low, which we do, we have one really quick-win, simple, easy-to-follow rule that we can employ to help us: avoid using IDs in CSS.

* ###### (It's Ok to Use IDs in HTML and Javascript)
 * It is still perfectly okay to use IDs in HTML and JavaScript; it is only in CSS that they prove troublesome.
 * When used, IDs should be _lowerCamelCase_

<a id="css-classes"></a>
### Class Naming
* Class names are ideally one or two lowercase words.
* Words are separated by a dash.
```css
.users-table {}
```
* Use of three words is acceptable when it would be confusing to not do so.
* Use class names that are as short as possible but as long as necessary.
* Aim for high reusability.  The more specific, the less reusable, so picking a name that is sensible, but leaves some "ambiguity wiggle room", is best.
* Only use dashes to separate words.
* Class names provide an API for your stylesheets and any other consuming agents.  Instead of presentational or cryptic names, always use class names that reflect the purpose of the element in question, or that are otherwise generic.  A class name should meaningfully answer "_what is this?_" to any outside consumer of the HTML.
* Names that are specific and reflect the purpose of the element should be preferred as these are most understandable and the least likely to change.
```css
/* Not recommended: meaningless */
#yee-1901 {}
/* Not recommended: presentational */
.button-green {}
.clear {}
/* Recommended: specific */
.body-container {}
.status-label {}
.user-thumbnail {}
.video {}
/* Recommended: state enhancing classes, these work very well with SASS nesting */
.active {} /* example: .dropdown-item.active */
.error {} /* example: .status-label.error {} */
.inactive {}
```
* For multi-word class names, arrange words that describe their function from generic to specific (much the same way CSS works with specificity) from left-to-right.
```CSS
/* not great */
.default-button {}
.cancel-button {}
/* vastly better */
.button-default {}
.button-cancel {}
```

<a id="bem"></a>
### What About BEM?
* [BEM](https://bem.info/) is a selector naming methodology that has been used in the past: you may encounter it in existing CSS.
* It produces selector rules such as
```css
.row-list .row-list--empty .row-list__empty-notice--reports:before {}
```
* This system works well for highly complex HTML/CSS clockwork
* BEM appears overwrought for the template-based, featherlight HTML we prefer
 * So we are moving away from it.


<a id="css-specificity"></a>
### Keep Specificity Low
* From Chris Coyier of <a href="http://codepen.io/chriscoyier/" target="_blank">codepen.io</a> and <a href="http://css-tricks.com/sass-style-guide/" target+"_blank">CSS-Tricks</a>:
> The overall philosophy is keep specificity low. There will always be times you need to override it, no matter how cool-dude-reusable you're being, so the lower the specificity is on a selector, the easier it is to override.

```css
/* bad */
body > article > div.grid-2-3 > section.post-body > pre:nth-child(38) > code {}
/* not bad */
article .post-body code {}
```

<a id="css-commenting"></a>
## CSS Commenting

* CSS needs more comments.
 * The cognitive overhead of working with CSS is huge. With so much to be aware of, and so many project-specific nuances to remember, the worst situation most developers find themselves in is being the-person-who-didn’t-write-this-code. Remembering your own classes, rules, objects, and helpers is manageable to an extent, but anyone inheriting CSS barely stands a chance.
 * With that said, here are some CSS Commenting Examples:

```css
/* ==========================================================================
   Section comment block
   ========================================================================== */
```
```css
/* Sub-section comment block
   ========================================================================== */
```
```css
/**
 * Short description using Doxygen-style comment format
 *
 * The first sentence of the long description starts here and continues on this
 * line for a while finally concluding here at the end of this paragraph.
 *
 * TODO: This is a todo statement that describes an atomic task to be completed
 *   at a later date. It wraps after 80 characters and following lines are
 *   indented by 2 spaces.
 */
```
```css
/* Basic comment */
```

<a id="css-media-queries"></a>
## Media query placement
* Place media queries as close to their relevant rule sets whenever possible. Don't bundle them all in a separate stylesheet or at the end of the document. Doing so only makes it easier for folks to miss them in the future. Here's a typical setup.
```css
.element { ... }
.element-avatar { ... }
.element-selected { ... }
/**/
@media (min-width: 480px) {
  .element { ...}
  .element-avatar { ... }
  .element-selected { ... }
}
```

<br><br>
[_table of contents_](#top)
<a id="sass"></a>


----
# SASS (SCSS) CODING STYLE GUIDE

* [SASS](http://sass-lang.com/) = Semantically Awesome Stylesheets
* [SCSS](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html) = "Sassy CSS" = the flavor of SASS we use.

<a id="scss-valid"></a>
## Use Valid SCSS:
* the Compass SASS Framework provides CSS validation when run.  Valid CSS is valid SCSS.
* Use an SCSS linter to reveal and prevent issues such as:
 * You have a class in your CSS but not anywhere in your app/views/ templates.
 * You are using the same selector multiple times (as they should almost always be combined).
 * The general formatting rules (nesting limits, line breaks between rulesets, lack of space after ':'s, etc) are broken.

<a id="scss-files"></a>
## .scss File Organization
* Styles that apply to the entire application should go into one or more Core SCSS files that get loaded at the start of the application
* Styles that apply to specific modules should be separated out into their own SCSS file for that module.
* All files should be concatenated and minified into a single file by a process like Compass.

<a id="scss-code"></a>
## SASS Code Conventions

<a id="scss-naming"></a>
### SASS/SCSS Naming Conventions
* CSS is a subset of SCSS so be sure to follow all the [CSS Naming Conventions](#css-specifiers).
* For SASS variable and mixin names, use lowercase and dash-seprarators, as we do for CSS.
* For multi-word variable names, arrange words that describe their function from generic to specific (much the same way CSS works with specificity) from left-to-right.
```SCSS
/* not great */
$light-blue
$dark-blue
/* vastly better */
$blue-light
$blue-dark
```

### List @extend(s) First
* Knowing right off the bat that this class inherits another whole set of rules from elsewhere is good.
```sass
.weather {
  @extends %module;
  ...
}
```

### List "Regular" Styles Next
```sass
.weather {
  @extends %module;
  background: LightCyan;
  ...
}
```

### List _@include(s)_ Next
* This visually separates the @extends and @includes as well as groups the @includes for easier reading. You might also want to make the call on separating user-authored @includes and vendor-provided @includes.
```sass
.weather {
  @extends %module;
  background: LightCyan;
  @include transition(all 0.3s ease-out);
  ...
}
```

### Nested Selectors Last
* Nothing goes after the nested stuff. And the same order as above within the nested selector would apply.
```sass
.weather {
  @extends %module;
  background: LightCyan;
  @include transition(all 0.3s ease);
  > h3 {
    border-bottom: 1px solid white;
    @include transform(rotate(90deg));
  }
}
```

<a id="scss-nesting"></a>
### Maximum Nesting: 3 Levels Deep
* Nesting shouldn't go very deep.  A good rule is if you are nesting more than three levels, ask yourself if there is another way you could structure your code.
```SASS
.weather {
  .cities {
    li {
      // no more!
    }
  }
}
```

### Media Query Nesting
* Nest media queries inside the block that they augment.

<a id="scss-colors"></a>
### Colors
* Variablize All Colors
 * Consider using <a href="http://chir.ag/projects/name-that-color" target="_blank">Name That Color</a> as a naming scheme for colors.  See <a href="http://davidwalsh.name/sass-color-variables-dont-suck" target="_blank">_Sass Color Variables That Don't Suck_</a>
  * <a href="http://theolabrothers.com/sip/" target="_blank">SIP</a> is a great Mac OS tool for working with color
* Keep them in a separate _colors.scss_ file

<br><br>
[_table of contents_](#top)
<a id="sources"></a>


----

# Sources & Inspiration

## "How we do CSS at..."
* Codepen: http://codepen.io/chriscoyier/blog/codepens-css
* Ghost:   http://dev.ghost.org/css-at-ghost/
* Github:  http://markdotto.com/2014/07/23/githubs-css/
* Medium:  https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06
* ThinkUp: https://github.com/ginatrapani/ThinkUp/wiki/Code-Style-Guide:-CSS
* Trello:  http://blog.trello.com/refining-the-way-we-structure-our-css-at-trello/

## General Coding Style Guides
* https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
* http://mdo.github.io/code-guide/
* http://cssguidelin.es/
* https://github.com/necolas/idiomatic-css
* http://csswizardry.com/2012/04/my-html-css-coding-style/

## SASS
* http://css-tricks.com/sass-style-guide/
