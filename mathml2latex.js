/*jshint esversion: 6 */
function MathMLParser() {


  
	const SUBSTITUTIONS_COMMENT_RE = /^\*\*/;
	function parseSubstitutions(subs) {
		return subs.split('\n').
			map(function(s) { return s.trim(); }).
			filter(function(s) { return s.length > 0 && (!SUBSTITUTIONS_COMMENT_RE.test(s)); }).
			map(function(s) { return s.replace(/^\s+/, "").replace(/\t+/, '\t').split('\t'); }).
			reduce( function(obj, pair) { obj[pair[0]]=pair[1]; return obj; } , {} );
	}


	const PH_BLOCK_START = "%BLOCK";
	const PH_BLOCK_END = '%';

	const SPECIAL_CHARS = "%#_$";
	const LEFT_BRACES = "({[";
	const RIGHT_BRACES = ")}]";


	const SUBSTITUTIONS = parseSubstitutions(`
	** Taken from MathParser

	** Tags:
	<mfrac>					\\frac{%BLOCK1%}{%BLOCK2%}
	<msup>					%BLOCK1%^{%BLOCK2%}
	<msub>					%BLOCK1%_{%BLOCK2%}
	<msqrt>					\\sqrt{%BLOCK1%}
	<mroot>					\\sqrt[%BLOCK2%]{%BLOCK1%}
	<mfenced>				\\left(%BLOCK1%\\right)
	<msubsup>				%BLOCK1%_{%BLOCK2%}^{%BLOCK3%}
	<munderover>				%BLOCK1%_{%BLOCK2%}^{%BLOCK3%}
	<munder>				%BLOCK1%_{%BLOCK2%}
	<mtable>				\\matrix{%BLOCKS%}
	<mtr>					%BLOCKS%\\cr
	<mtd>					%BLOCK1%&


	** Entities
	&dot;					\\cdot 
	&sdot;					\\cdot 
	&middot;				\\cdot 
	&times;					\\times 
	&equals;				\\Relbar 
	&forall;				\\forall 
	&exist;					\\exists 
	&%x220d;				\\ni 
	&lowast;				* 
	&minus;					- 
	&frasl;					/ 
	&ratio;					: 
	&lt;					< 
	&gt;					> 
	&cong;					\\cong 
	&InvisibleTimes;			 


	** Pfeile
	&harr;					\\leftrightarrow 
	&larr;					\\leftarrow 
	&rarr;					\\rightarrow 
	&hArr;					\\Leftrightarrow 
	&lArr;					\\Leftarrow 
	&rArr;					\\Rightarrow 


	** dynamische Zeichen
	&sum;					\\sum 
	&prod;					\\prod 
	&Integral;				\\int 
	&dd;					d 


	** griechisches Alphabet
	&alpha;					\\alpha
	&beta;					\\beta
	&gamma;					\\gamma 
	&delta;					\\delta 
	&epsi;					\\epsilon 
	&eta;					\\eta 
	&iota;					\\iota 
	&kappa;					\\kappa 
	&lambda;				\\lambda 
	&mu;					\\mu 
	&mgr;					\\mu 
	&nu;					\\nu 
	&omicron;				o 
	&pi;					\\pi 
	&theta;					\\theta 
	&rho;					\\rho 
	&rgr;					\\rho 
	&sigma;					\\sigma 
	&tau;					\\tau 
	&upsilon;				\\upsilon 
	&phiv;					\\phi
	&phi;					\\varphi
	&chi;					\\chi 
	&piv;					\\varpi 
	&pgr;					\\pi 
	&ohgr;					\\omega 
	&omega;					\\omega 
	&xi;					\\xi 
	&psi;					\\psi 
	&zeta;					\\zeta 
	&Delta;					\\Delta 
	&Phi;					\\Phi 
	&Gamma;					\\Gamma 
	&Lambda;				\\Lambda 
	&Pi;					\\Pi 
	&tgr;					\\tau 
	&Theta;					\\Theta 
	&Sigma;					\\Sigma 
	&Upsilon;				\\Upsilon 
	&sigmaf;				\\varsigma 
	&Omega;					\\Omega 
	&Xi;					\\Xi 
	&Psi;					\\Psi 
	&epsiv;					\\epsilon 
	&phgr;					\\phi 
	&ggr;					\\gamma 
	&eegr;					\\eta 
	&igr;					\\iota 
	&phgr;					\\phi 
	&kgr;					\\kappa 
	&lgr;					\\lambda 
	&ngr;					\\nu 
	&ogr;					o 
	&thgr;					\\theta 
	&sgr;					\\sigma 
	&ugr;					\\upsilon 
	&zgr;					\\zeta 
	&Agr;					A 
	&Bgr;					B 
	&KHgr;					X 
	&Egr;					E 
	&PHgr;					\\Phi 
	&Ggr;					\\Gamma 
	&EEgr;					H 
	&Igr;					I 
	&THgr;					\\Theta 
	&Kgr;					K 
	&Lgr;					\\Lambda 
	&Mgr;					M 
	&Ngr;					N 
	&Ogr;					O 
	&Pgr;					\\Pi 
	&Rgr;					P 
	&Sgr;					\\Sigma 
	&Tgr;					T 
	&Ugr;					\\Upsilon 
	&OHgr;					\\Omega 
	&Zgr;					Z 


	** Pfeile und andere Operatoren
	&perp;					\\bot 
	&sim;					~ 
	&prime;					\\prime 
	&le;					\\le 
	&ge;					\\ge 
	&infin;					\\infty 
	&clubs;					\\clubsuit 
	&diams;					\\diamondsuit 
	&hearts;				\\heartsuit 
	&spades;				\\spadesuit 
	&PlusMinus;				\\pm 
	&Prime;					\\prime\\prime 
	&prop;					\\propto 
	&part;					\\partial 
	&bull;					\\bullet 
	&ne;					\\neq 
	&equiv;					\\equiv 
	&asymp;					\\approx 
	&hellip;				... 
	&VerticalBar;				\\mid 
	&crarr;					\\P 
	&alefsym;				\\aleph 
	&image;					\\Im 
	&real;					\\Re 
	&weierp;				\\wp 
	&otimes;				\\otimes 
	&oplus;					\\oplus 
	&empty;					\\emtyset 
	&cap;					\\cap 
	&cup;					\\cup 
	&sup;					\\supset 
	&supe;					\\seupseteq 
	&nsub;					\\not\\subset 
	&sub;					\\subset 
	&sube;					\\subseteq 
	&isin;					\\in 
	&notin;					\\notin 
	&ang;					\\angle 
	&nabla;					\\nabla 
	&radic;					\\surd 
	&and;					\\wedge 
	&or;					\\vee 
	&and;					\\wedge 
	&ang;					\\angle 
	&angle;					\\angle 
	&ap;					\\approx 
	&approx;				\\approx 
	&bigoplus;				\\oplus 
	&bigotimes;				\\otimes 
	&bot;					\\bot 
	&bottom;				\\bot 
	&cap;					\\cap 
	&CirclePlus;				\\oplus 
	&CircleTimes;				\\otimes 
	&cong;					\\cong 
	&Congruent;				\\equiv 
	&cup;					\\cup 
	&darr;					\\downarrow 
	&dArr;					\\Downarrow 
	&Del;					\\nabla 
	&DoubleDownArrow;			\\Downarrow 
	&DoubleLeftArrow;			\\Leftarrow 
	&DoubleLeftRightArrow;			\\Leftrightarrow 
	&DoubleRightArrow;			\\Rightarrow 
	&DoubleUpArrow;				\\Uparrow 
	&downarrow;				\\downarrow 
	&Downarrow;				\\Downarrow 
	&DownArrow;				\\Downarrow 
	&Element;				\\in 
	&emptyv;				\\oslash 
	&equiv;					\\equiv 
	&exist;					\\exists 
	&Exist;					\\exists 
	&forall;				\\forall 
	&ForAll;				\\forall 
	&ge;					\\geq 
	&geq;					\\geq 
	&GreaterEqual;				\\geq 
	&harr;					\\leftrightarrow 
	&hArr;					\\Leftrightarrow 
	&iff;					\\Leftrightarrow 
	&Implies;				\\Rightarrow 
	&in;					\\in 
	&infin;					\\infty 
	&int;					\\int 
	&Integral;				\\int 
	&isin;					\\in 
	&isinv;					\\in 
	&diam;					\\diamond 
	&diamond;				\\diamond 
	&lang;					\\left\\langle 
	&langle;				\\left\\langle 
	&larr;					\\leftarrow 
	&lArr;					\\Leftarrow 
	&le;					\\leq 
	&LeftAngleBracket;			\\left\\langle 
	&Leftarrow;				\\Leftarrow 
	&LeftArrow;				\\leftarrow 
	&leftrightarrow;			\\leftrightarrow 
	&Leftrightarrow;			\\Leftrightarrow 
	&LeftRightArrow;			\\leftrightarrow 
	&leq;					\\leq 
	&lowast;				\\ast 
	&minus;					- 
	&nabla;					\\nabla 
	&ne;					\\neq 
	&NotElement;				\\notin 
	&NotEqual;				\\notin 
	&notin;					\\notin 
	&oplus;					\\oplus 
	&or;					\\vee 
	&otimes;				\\otimes 
	&part;					\\partial 
	&partialD;				\\partial 
	&perp;					\\bot 
	&prod;					\\Pi 
	&Product;				\\Pi 
	&rang;					\\right\\rangle 
	&rangle;				\\right\\rangle 
	&rarr;					\\rightarrow 
	&rArr;					\\Rightarrow 
	&RightAngleBracket;			\\right\\rangle 
	&rightarrow;				\\rightarrow 
	&Rightarrow;				\\Rightarrow 
	&RightArrow;				\\rightarrow 
	&sdot;					\\cdot 
	&sim;					\\sim 
	&prop;					\\propto 
	&Proportional;				\\propto 
	&propto;				\\propto 
	&sub;					\\subset 
	&sube;					\\subseteq 
	&subE;					\\subseteq 
	&subset;				\\subset 
	&subseteq;				\\subseteq 
	&subseteqq;				\\subseteq 
	&SubsetEqual;				\\subseteq 
	&sum;					\\Sigma 
	&Sum;					\\Sigma 
	&sup;					\\supset 
	&supe;					\\supseteq 
	&supE;					\\supseteq 
	&Superset;				\\supset	
	&SupersetEqual;				\\supseteq 
	&supset;				\\supset 
	&supseteq;				\\supseteq 
	&supseteqq;				\\supseteq 
	&Tilde;					\\sim 
	&TildeFullEqual;			\\cong 
	&TildeTilde;				\\approx 
	&uarr;					\\uparrow 
	&uArr;					\\Uparrow 
	&uparrow;				\\uparrow 
	&Uparrow;				\\Uparrow 
	&UpArrow;				\\uparrow 
	&UpTee;					\\bot 
	&varnothing;				\\oslash 
	&varpropto;				\\propto 
	&vee;					\\vee 
	&vprop;					\\propto 
	&wedge;					\\wedge 
	&xoplus;				\\oplus 
	&xotime;				\\otimes 
	&Space;					 
	&colon;					:
	&ApplyFunction;				 
	&squ;					 
	`);

	let buf;
	let pos;
	
	
	// temporary variables (declared global for better performance)
	//protected String startTag, endTag;
	let nextTag;
	let tagBuf = "";  // used by readNextTag() & getBlockEnd()
	
	
	/**
	 * Parses MathML code into LaTeX code using the substitution table genereated
	 * by the constructor.<br>
	 * Only presentation markup can be parsed properly, no use for parsing
	 * content markup.
	 *
	 * Both notations of entities can be parsed: The plain MathML notation, starting with
	 * an ampersand sign (e.g. '&amp;equals;'), or the "HTML wrapped" notation startig with an
	 * entity for the ampersand sign (e.g. '&amp;amp;equals;'). 
	 * 
	 * @param buf a StringBuffer containig the MathML code to parse
	 * @param parseOpts object of
   *   { "wrappedEntities": "indicates whether the entities in the MathML code are
	 *        HTML wrapped (e.g. '&amp;amp;PlusMinus;'), or not (e.g. '&amp;PlusMinus;')",
   *     "skipUnknownEntities": "??" }
   *
	 * @return a StringBuffer containig the LaTeX representation of the input
	 * @throws Exception if an error occurs while parsing
	 */
	
	this.parse = function MathMLParser$parse(s, parseOpts) {
		buf = s;
		pos = 0;
		if (!buf || buf.length === 0) {
			return null;
		}
		
		let result = "";

		while (buf.indexOf("<", pos) !== -1) {
			result += this.parseBlock(this.getNextTag(), parseOpts);
			this.skipFollowingTag();
		}
		// xTODO besser result stutzen? -> return new StringBuffer(result) o. result.toString()
		return result;
		
	};
	
	
	/** 
	 * Parses a MathML block in buf recursively into LaTeX code.
	 * 
	 * @param startTag 
	 * @return a string with the LaTeX representation of the input
	 */
	this.parseBlock = function MathMLParser$parseBlock(startTag, parseOpts) {
		
		const endTag = generateEndTag(startTag);
		const blockEnd = this.getBlockEnd(startTag, endTag);
		
		let result = "";
		let blockContent;
		let inside = true;
		
		let blockNumber = 0;
		let prevBlockNumber;
		
		while (pos <= blockEnd) {
			
			// scan for subblocks
			let i = pos;
			while ((i <= blockEnd) && (buf.charAt(i) !== '<')) {
				i++;
			}
			
			if ((startTag !== endTag) && (i > blockEnd)) {
				
				// if sure to be at the end of the block hierarchy (inside), append block content to result 
				if (inside) {
					blockContent = buf.substring(pos, blockEnd+1);
					result += this.parseBlockContent(blockContent, parseOpts);
					pos = pos + blockContent.length;
					blockContent = null;
				}
				else {
					// if all subblocks have been processed skip to the end
					pos = blockEnd+1;
				}
			}
			else {
				// this block has subblocks
				inside = false;
				
				// if there is a substitution for the next block, write it to 'result' 
				let substBuf = SUBSTITUTIONS[startTag];
				if (substBuf) {
					
					let phIndex;
					let substIndex = 0;
					
					// parse subblocks recursively 
					while ( ((phIndex = substBuf.indexOf(PH_BLOCK_START, substIndex)) > -1) && (pos < blockEnd)) { // blockEnd-1 ??
						
						// write substitution up to the block marker
						while (substIndex < phIndex) {
							result += substBuf.charAt(substIndex);
							substIndex++;
						}
						substIndex += PH_BLOCK_START.length;
						
						// get number of the block to parse
						let blockNumberIndex = substIndex;
						while (substBuf.charAt(substIndex) !== PH_BLOCK_END) {
							substIndex++;
						}
						
						prevBlockNumber = blockNumber;
						
						let blockNumberStr = substBuf.substring(blockNumberIndex, substIndex);
						
						if (blockNumberStr === "S") {
							// keyword is BLOCKS -> parse all inner blocks in order of appearance
							
							// skip PH_BLOCK_END
							++substIndex;
							
							// jump to the block to parse
							this.skipBlocks((1 - prevBlockNumber) - 1);
													
							// parse subblocks
							while ((buf.substring(pos, blockEnd+1)).indexOf('<') !== -1) {
								nextTag = this.getNextTag();
								result += this.parseBlock(nextTag, parseOpts);
								this.skipFollowingTag();
							}
						}
						else {
							// keyword is BLOCK + block number, parse inner blocks in given order
							
							try {
								blockNumber = parseInt(blockNumberStr, 10);
							}
							catch (e) {
								throw new Error("Parsing error at character "+pos+": Unparseable block number in substitution.");
							}
						
							// skip PH_BLOCK_END
							substIndex++;
							
							// jump to the block to parse
							this.skipBlocks((blockNumber - prevBlockNumber) - 1);
													
							// parse subblock
							nextTag = this.getNextTag();
							result += this.parseBlock(nextTag, parseOpts);
							
							this.skipFollowingTag();
						}
					}
					
					// write (end of) substitution
					while (substIndex < substBuf.length) {
						result += substBuf.charAt(substIndex);
						substIndex++;
					}
					
					pos = blockEnd + endTag.length;
				}
				else {
					
					// parse subblocks of nextTag
					while ((buf.substring(pos, blockEnd+1)).indexOf('<') !== -1) {
						nextTag = this.getNextTag();
						result += this.parseBlock(nextTag, parseOpts);
						this.skipFollowingTag();
					}
				}
			}
		}
		//System.out.print(pos);
		// xTODO Warum braucht 'amayaOut.htm' diese Anweisung? -> 853, 853 (<mprescripts/>)
		pos = blockEnd;
		return result;
		//System.out.println(", "+pos+" ("+startTag+")");
	};
	

	/**
	 * Jumps to the next tag, reads it into 'startTag' an generates the corresponding 'endTag'.
	 */
	this.getNextTag = function MathMLParser$getNextTag() {
		
		while (buf.charAt(pos) !== '<') {
			++pos;
		}

		tagBuf = "";
		
		while (buf.charAt(pos) !== '>') {
			tagBuf += buf.charAt(pos);
			++pos;
		}
		++pos;
		tagBuf += '>';
		
		return tagBuf.toString();
	};
	
	
	/**
	 * Generates an end tag corresponding to the given 'startTag'.
	 * 
	 * @param startTag the start tag to generate an end tag from
	 * @return the end tag for the given start tag
	 */
	function generateEndTag(startTag) {
		
		if (startTag.charAt(startTag.length-2) !== '/') {
			
			if (startTag.indexOf(' ') > -1) {
				// delete parameters of startTag
				return "</"+startTag.substring(1, startTag.indexOf(' '))+">";
			}
			else {
				return "</"+startTag.substring(1, startTag.length);
			}
		}
		else {
			// if the tag is self-closing (e.g. "<mprescripts/>"), the endTag is the startTag
			return startTag;
		}
	}
	
	
	/**
	 * Skips all characters up to the end of the next tag.
	 */
	this.skipFollowingTag = function MathMLParser$skipFollowingTag() {
		while (buf.charAt(pos) !== '>') {
			++pos;
		}
		++pos;
	};
	
	
	/**
	 * Skips (back and forth) a given number of blocks from the actual position.
	 * 
	 * @param blocksToSkip the number of blocks to skip
	 */
	this.skipBlocks = function MathMLParser$skipBlocks(blocksToSkip) {
		
		if (blocksToSkip > 0) {
			for (let i = 0; i < blocksToSkip; i++) {
				
				let startTag = this.getNextTag();
				let endTag = generateEndTag(startTag);
				
				pos = this.getBlockEnd(startTag, endTag);
				
				if (endTag !== null) {
					pos = pos + endTag.length;
				}
				else {
					pos = pos + startTag.length;
				}
			}
		}
		else if (blocksToSkip < 0) {
			
			for (let i = 0; i > blocksToSkip; i--) {
				
				let subBlocks = 1;
	
				while (buf.charAt(pos) !== '>') {
					pos--;
				}
		
				tagBuf = "";
								
				while (buf.charAt(pos) !== '<') {
					tagBuf = buf.charAt(pos) + tagBuf;
					--pos;				
				}
				tagBuf = '<' + tagBuf;
				
				
				let blockEndTag = tagBuf + "";
				let blockStartTag = tagBuf.substr(0, 1) + tagBuf.substr(2);
	
				do {
					while (buf.charAt(pos) !== '>') {
						pos--;
					}
		
					tagBuf = "";
								
					while (buf.charAt(pos) !== '<') {
						tagBuf = buf.charAt(pos) + tagBuf;
						pos--;				
					}
					tagBuf = '<' + tagBuf;
					
								
					if (tagBuf.indexOf(" ") > -1) {
						tagBuf = trimTagAttributes(tagBuf);
					}
					
					if (tagBuf === blockStartTag) {
						--subBlocks;
					}
					else {
						if (tagBuf === blockEndTag) {
							--subBlocks;
						}
					}
				} while ( (subBlocks > 0) || (tagBuf !== blockStartTag) );
			}
		}
	};
	
	function trimTagAttributes(tag) {
		return tag.substr(0, tag.indexOf(" ")) + tag.charAt(tag.length - 1);
	}
	
	
	/**
	 * Returns the end index of the block defined by the 'startTag' parameter skipping
	 * all subblocks. The end index is the position of the character before the closing
	 * tag of the block.
	 * 
	 * @param startTag the tag that opened the block
	 * @param endTag the end tag to seek
	 * @return the index of the closing tag
	 */
	this.getBlockEnd = function MathMLParser$getBlockEnd(startTag, endTag) {
		
		if (startTag !== endTag) {
			
			let pos2 = pos;
			let subBlocks = 1;
			
			// delete parameters of startTag
			if (startTag.indexOf(' ') > -1) {
				startTag = startTag.substring(0, startTag.indexOf(' ')) + '>';
			}
			
			do {
				pos2 = buf.indexOf('<', pos2);
				
				[buf, pos2, tagBuf] = consumeUntil(buf, pos2, ">");
							
				if (tagBuf === endTag) {
					subBlocks--;
				}
				else { 
					if (tagBuf.indexOf(" ") > -1) {
						tagBuf = trimTagAttributes(tagBuf);
					}
								
					if (tagBuf === startTag) {
						subBlocks++;
					}
				}
			} while ( (subBlocks > 0) || (tagBuf !== endTag) );
			
			return (pos2 - endTag.length);
		}
		
		return pos - startTag.length;
	};
	
	
	/**
	 * Parses a String into Latex syntax and returns it.
	 * 
	 * @param s the string to parse
	 * @return the Latex representation of the given string
	 * @throws Exception if HTML wrapped entities were expected but not found
	 */
	 
	function stringSplice(s, start, del, item) {
		return s.substr(0, start) + item + s.substr(start + del);
	}
	
	function spliceAtChars(s, chars, offset, replace, item) {
		for (let i = 0; i < chars.length; i++) {
			let index = 0;
			while ((index = s.indexOf(chars[i], index)) > -1) {
				s = stringSplice(s, index+offset, replace, item);
				index = index + item.length + 1;
			}
		}
		return s;
		
	}
	 	
	function consumeUntil(s, index, delimiter) {
		let token = "";
		
		while (s.charAt(index) !== delimiter) {
			token += s.charAt(index);
			++index;
		}
		token += delimiter;
		return [s, index, token];
	}
	 
	this.parseBlockContent = function MathMLParser$parseBlockContent(s, parseOpts) {
		
		// xTODO hier!
		//System.out.println("got '"+s+"'");
		
		// replace backslashes
		s = spliceAtChars(s, "\\", 1, 0, "backslash");
		
		// replace braces
		s = spliceAtChars(s, LEFT_BRACES, 0, 0, "\\left");
		s = spliceAtChars(s, RIGHT_BRACES, 0, 0, "\\right");

		// replace special characters
		s = spliceAtChars(s, SPECIAL_CHARS, 0, 0, "\\");
		
		
		// replace Entities
		let index = 0;
		while ((index = s.indexOf("&", index)) > -1) {
			
			let entity = "";
			
			[s, index, entity] = consumeUntil(s, index, ";");
			
			if (parseOpts.wrappedEntities && entity === "&amp;") {
				
				s = stringSplice(s, index - 4, 4, "");
				index -= 5;
				
				entity = "";
				try {
					[s, index, entity] = consumeUntil(s, index, ";");
				}
				catch (e) {
					throw new Error("Parsing error at character "+pos+": MathML code is not HTML wrapped.");
				}
				
				++index;
			}
			
			let entitySubst =  SUBSTITUTIONS[entity];
			if (entitySubst) {
				s = stringSplice(s, index - entity.length, entity.length, entitySubst + " ");
				index = index - entity.length + entitySubst.length + 1;
			}
			else {
				if (parseOpts.skipUnknownEntities) {
					s = stringSplice(s, index - entity.length, entity.length, " ");
					index = index - entity.length + 1;
				}
				else {
					let prefix = "NOTFOUND:'", suffix = "' ";
					s = stringSplice(s, index - entity.length, 0, prefix);
					index += prefix.length;
					s = stringSplice(s, index, 0, suffix);
					index += suffix.length;
				}
			}
		}
		
		// replace '&'
		s = spliceAtChars(s, "&", 0, 0, "\\");
		
		// replace german "umlauts"
		s = "äa,ÄA,öo,ÖO,üu,ÜU,ßs".split(",").reduce(function(s, pair){ 
			return spliceAtChars(s, pair[0], 0, 1, "\\protect\"" + pair[1]);
		}, s);
		
		return s;
	};
	
	
}
                            
