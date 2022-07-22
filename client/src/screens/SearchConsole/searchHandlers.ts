import { headers, json, _rest } from "../../utils/test-handlers-utils";

const search = _rest.post('http://localhost:3000/api/search', (req, res, ctx) => {
    const _headers = headers(ctx);
    let _json = json(ctx, {});

    let _result: any = null;

    _result = {
        success: true,
        results: [
            { title: 'Test 2', position: 2 },
            { title: 'Test 1', position: 1 },
            { title: 'Test 3', position: 3 },
            { title: 'Test 4', position: 4 },
            { title: 'Test 5', position: 5 },
            { title: 'Test 6', position: 6 },
            { title: 'Test 7', position: 7 },
            { title: 'Test 8', position: 8 },
            { title: 'Test 9', position: 9 },
            { title: 'Test 10', position: 10 },
        ],
    }

    _json = json(ctx, {
        statusCode: "10000", message: "Success",
        data: _result
    });

    return res(..._headers, _json, ctx.delay(10))
});

const handlers = [search]

export default handlers