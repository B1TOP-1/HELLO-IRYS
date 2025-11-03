// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title MintNFT
 * @dev 基于Irys网络的NFT合约，总量1000个，每人最多mint 3个
 */
contract MintNFT is ERC721, Ownable {
    using Strings for uint256;

    // 最大供应量
    uint256 public constant MAX_SUPPLY = 1000;
    
    // 每个地址最大mint数量
    uint256 public constant MAX_PER_ADDRESS = 3;
    
    // 当前已mint的tokenId
    uint256 private _currentTokenId;
    
    // Irys存储的metadata URI
    string private _baseTokenURI;
    
    // 记录每个地址已mint的数量
    mapping(address => uint256) public mintedCount;
    
    // 事件
    event NFTMinted(address indexed minter, uint256 indexed tokenId);
    event BaseURIUpdated(string newBaseURI);
    
    /**
     * @dev 构造函数
     * @param baseURI Irys网关上的metadata URI
     */
    constructor(string memory baseURI) ERC721("HELLO IRYS NFT", "HIRYSNFT") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @dev 公开mint函数，任何人都可以调用
     */
    function mint() external {
        // 检查是否达到最大供应量
        require(_currentTokenId < MAX_SUPPLY, "Max supply reached");
        
        // 检查该地址是否超过mint限制
        require(mintedCount[msg.sender] < MAX_PER_ADDRESS, "Max mint per address reached");
        
        // mint NFT
        _safeMint(msg.sender, _currentTokenId);
        
        // 更新mint计数
        mintedCount[msg.sender]++;
        
        emit NFTMinted(msg.sender, _currentTokenId);
        
        _currentTokenId++;
    }
    
    /**
     * @dev 批量mint函数
     * @param amount 要mint的数量
     */
    function batchMint(uint256 amount) external {
        require(amount > 0 && amount <= MAX_PER_ADDRESS, "Invalid amount");
        require(_currentTokenId + amount <= MAX_SUPPLY, "Exceeds max supply");
        require(mintedCount[msg.sender] + amount <= MAX_PER_ADDRESS, "Exceeds max mint per address");
        
        for (uint256 i = 0; i < amount; i++) {
            _safeMint(msg.sender, _currentTokenId);
            emit NFTMinted(msg.sender, _currentTokenId);
            _currentTokenId++;
        }
        
        mintedCount[msg.sender] += amount;
    }
    
    /**
     * @dev 管理员mint函数（用于空投等特殊场景）
     * @param to 接收地址
     * @param amount mint数量
     */
    function ownerMint(address to, uint256 amount) external onlyOwner {
        require(_currentTokenId + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        for (uint256 i = 0; i < amount; i++) {
            _safeMint(to, _currentTokenId);
            emit NFTMinted(to, _currentTokenId);
            _currentTokenId++;
        }
    }
    
    /**
     * @dev 更新base URI（只有owner可以调用）
     * @param newBaseURI 新的base URI
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }
    
    /**
     * @dev 返回token的URI
     * @param tokenId token ID
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        
        // 如果baseURI设置为完整的metadata URL，直接返回
        // 否则返回 baseURI + tokenId
        if (bytes(_baseTokenURI).length > 0) {
            // 如果baseURI已经包含完整路径（包含文件扩展名），直接返回
            return _baseTokenURI;
        }
        
        return string(abi.encodePacked(_baseTokenURI, tokenId.toString()));
    }
    
    /**
     * @dev 获取当前已mint的总数
     */
    function totalSupply() public view returns (uint256) {
        return _currentTokenId;
    }
    
    /**
     * @dev 获取剩余可mint数量
     */
    function remainingSupply() public view returns (uint256) {
        return MAX_SUPPLY - _currentTokenId;
    }
    
    /**
     * @dev 获取某地址剩余可mint数量
     * @param account 查询地址
     */
    function remainingMintsForAddress(address account) public view returns (uint256) {
        return MAX_PER_ADDRESS - mintedCount[account];
    }
    
    /**
     * @dev 获取下一个tokenId
     */
    function getNextTokenId() public view returns (uint256) {
        return _currentTokenId;
    }
    
    /**
     * @dev 返回base URI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
}

