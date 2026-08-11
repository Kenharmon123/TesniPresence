export const xml = (value: string) => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
export const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g,']]]]><![CDATA[>')}]]>`;
