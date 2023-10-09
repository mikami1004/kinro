let webView = new WebView();
await webView.loadURL("https://kinro.ntv.co.jp/lineup");
let html = await webView.getHTML();
let title;
let date;
const np = /(?<=<a href=\"\/lineup\/\d{0,}\">).*?(?=<\/a>)/g;
const dp = /(?<=<a href=\"\/lineup\/\d{4}).*?(?=\".*<\/a>)/g;

title=html.match(np);
date=html.match(dp);

let mm_dd=[date.length];
for(let i=0;i<date.length;i++) {
  mm_dd[i] = date[i].match(/.{2}/g);
}

let widget = new ListWidget();
widget.setPadding(4,4,4,4);

widget.url='https://kinro.ntv.co.jp/lineup';




switch(config.widgetFamily) {
  case "small":
    let s_stack = widget.addStack();
    s_stack.topAlignContent()
    s_stack.layoutVertically()
    let s_text = s_stack.addText("次の金曜ロードショーは");
    s_text.font = Font.boldRoundedSystemFont(15);
    s_text.textColor = new Color("#797979");
    s_stack.addSpacer(3
      )

    let s_t_stack = widget.addStack();
    let s_title = s_t_stack.addText(title[0]);
    s_title.font = Font.boldRoundedSystemFont(20);
    s_t_stack.layoutVertically()
    s_t_stack.addSpacer(3)

    let s_d_stack = widget.addStack();
    let s_date = s_d_stack.addText(mm_dd[0][0]+"月"+mm_dd[0][1]+"日放送");
    s_date.font = Font.boldRoundedSystemFont(15);
    s_date.textColor = new Color("#797979");
    s_d_stack.layoutVertically()
    s_d_stack.bottomAlignContent();


    Script.setWidget(widget);
  break;

  case "medium":
    let row = widget.addStack();
    row.topAlignContent();

    for(let i=0;i<title.length;i++) {
      let m_stack = row.addStack();
      let m_d_stack = m_stack.addStack();
      let m_t_stack = m_stack.addStack();

      let m_date=m_d_stack.addText(mm_dd[i][0]+"月"+mm_dd[i][1]+"日放送");
      m_d_stack.setPadding(0,0,10,0)
      let m_title=m_t_stack.addText(title[i]);

      m_date.font=Font.boldRoundedSystemFont(13);
      m_date.textColor=new Color("#797979");
      m_title.font = Font.boldRoundedSystemFont(16);
      
      m_stack.layoutVertically();
      if(i!=title.length-1) {
        m_stack.setPadding(0, 0, 0, 10);
      }
    }
    Script.setWidget(widget);
    break;
}
