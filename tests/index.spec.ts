import CacheSpec from "./spec/cache.spec";
import ParserSpec from "./spec/expression/parser.spec";
import TokenizerSpec from "./spec/expression/tokenizer.spec";
import AbstractDirectiveSpec from "./spec/abstract-directive.spec";
import NgForDirectiveSpec from "./spec/ngfor.spec";
import ExpressionSpec from "./spec/expression.spec";
import NgTemplateSpec from "./spec/ngtemplate.spec";
import ConstructorSpec from "./spec/constructor.spec";

TokenizerSpec();
ParserSpec();
ExpressionSpec();
CacheSpec();
AbstractDirectiveSpec();
NgForDirectiveSpec();
NgTemplateSpec();
ConstructorSpec();