import { ResponseTransformer, rest, RestContext } from 'msw'

const search = rest.post('https://www.googleapis.com/customsearch/v1', (req, res, ctx) => {

    let json = (ctx: RestContext, obj: any): ResponseTransformer<any, any> => ctx.json(obj)

    let _result: any = null;

    _result = [
        {
            "position": 0,
            "kind": "customsearch#result",
            "title": "Barcelona begin to plot swoop for Bayern Munich striker Robert ...",
            "htmlTitle": "Barcelona begin to plot swoop for Bayern Munich striker Robert ...",
            "link": "https://www.eurosport.com/football/transfers/2021-2022/barcelona-begin-to-plot-swoop-for-bayern-munich-striker-robert-lewandowki-after-contract-talks-stall_sto8934706/story.shtml",
            "displayLink": "www.eurosport.com",
            "snippet": "22 may 2022 ... Barcelona begin to plot swoop for Bayern Munich striker Robert Lewandowki after contract talks stall - Paper Round.",
            "htmlSnippet": "22 may 2022 <b>...</b> Barcelona begin to plot swoop for Bayern Munich striker Robert <b>Lewandowki</b> after contract talks stall - Paper Round.",
            "cacheId": "Fy0t804qrE8J",
            "formattedUrl": "https://www.eurosport.com/football/...lewandowki.../story.shtml",
            "htmlFormattedUrl": "https://www.eurosport.com/football/...<b>lewandowki</b>.../story.shtml"
        },
        {
            "position": 1,
            "kind": "customsearch#result",
            "title": "Lewandowki one step away from Bundesliga history",
            "htmlTitle": "<b>Lewandowki</b> one step away from Bundesliga history",
            "link": "https://fcbayern.com/en/news/2021/05/champions-2021/lewandowki-one-step-away-from-bundesliga-history",
            "displayLink": "fcbayern.com",
            "snippet": "8 may 2021 ... Robert Lewandowski bagged a superb hat-trick in the 6-0 rout of Borussia Mönchengladbach, leaving him just one goal shy of Gerd Müller's ...",
            "htmlSnippet": "8 may 2021 <b>...</b> Robert Lewandowski bagged a superb hat-trick in the 6-0 rout of Borussia Mönchengladbach, leaving him just one goal shy of Gerd Müller&#39;s&nbsp;...",
            "cacheId": "0mJR2zLL0U0J",
            "formattedUrl": "https://fcbayern.com/.../lewandowki-one-step-away-from-bundesliga-history",
            "htmlFormattedUrl": "https://fcbayern.com/.../<b>lewandowki</b>-one-step-away-from-bundesliga-history"
        }
    ]

    let _json = json(ctx, {
        statusCode: "10000", message: "Success",
        data: _result
    });

    return res(_json, ctx.delay(10))
});

const searchHandlers = [search]

export default searchHandlers