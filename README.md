# What are we making?
- Minimal  HTML/JS site
- That has the following buttons which map to the solidity smart contract
    - Connect   ✅
    - Buy Coffee
        - Button to coffee    ✅
        - Call a function on a smart contract      ✅
        - Have a test blockchain that we can call?   ✅
    - Get Balance    ✅
    - Withdraw        ✅
    - Typescript      ✅

    - 1.How to open the vite?
    pnpm tsc index-ts.ts(turn the ts to js)
    pnpm add vite(the first time to run )
    pnpm vite(open the  serve)
    - 2.anvil --load-state fundme-anvil.json (open the anvil serve)


- 教程：https://updraft.cyfrin.io/courses/full-stack-web3-development-crash-course/html-ts-buy-me-a-coffee/introduction
- 功能介绍：首先需要打开本地anvil(必须），然后把管理员地址（(0) 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000.000000000000000000 ETH)）的秘钥-0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 加入metamask中，并且加入 Anvil localhost网络：
- 名称 Anvil localhost，
- url:http://127.0.0.1:8545
- 链ID:31337
- 货币符号:ETH
- 这样就可以看到管理员账户中有10000个以太坊了。
- 然后如果使用js，则点击go live开启服务器即可；如果使用typescript，则必须使用vite
- 步骤：
- 1.首先在ai的帮助下把js代码转化为ts代码
- 2.pnpm tsc index-ts.ts     将ts编译为js
- 3.pnpm add vite 第一次的时候才需要执行
- 4.pnpm vite 开启服务器
- 现在万事俱备，可以开始测试了，首先链接metamask，然后输入数值，买咖啡，其实是把eth发送到constants-ts.ts中的export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"地址中。
- 然后点击get balance查看合约地址的余额
- 最后点击withdraw把合约余额提回管理员钱包中
- 最后还有一个未完成的功能，funding address，显示合约地址和余额（待完成）

- 评价：这个项目主要考验了钱包的交互，核心代码是index-ts.ts   难度较低
