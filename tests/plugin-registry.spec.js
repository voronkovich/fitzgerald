import { PluginRegistry, applyPlugins } from '../src/plugin-registry.js'

describe('PluginRegistry', () => {
    it('allows to add plugin', () => {
        const registry = new PluginRegistry()

        registry.add({
            key: 'foo',
            callable: () => {},
        })

        expect(registry.has('foo')).toBe(true)
    })

    it('throws exception when plugin key invalid not provided', () => {
        const registry = new PluginRegistry()

        expect(() => {
            registry.add({
                callable: () => {}
            })
        }).toThrow('Plugin key must be not empty string or symbol.')

        expect(() => {
            registry.add({
                key: '',
                callable: () => {}
            })
        }).toThrow('Plugin key must be not empty string or symbol.')
    })

    it('throws exception when plugin callable not provided', () => {
        const registry = new PluginRegistry()

        expect(() => {
            registry.add({
                key: 'foo',
            })
        }).toThrow('Plugin "foo" must have callable.')
    })

    it('treats plugins as lazy by default', () => {
        const registry = new PluginRegistry()

        registry.add({
            key: 'foo',
            callable: () => {},
        })

        expect(registry.get('foo').lazy).toBe(true)
    })

    it('allows to set plugin as not lazy', () => {
        const registry = new PluginRegistry()

        registry.add({
            key: 'foo',
            callable: () => {},
            lazy: false,
        })

        expect(registry.get('foo').lazy).toBe(false)
    })

    it('provides plugins keys', () => {
        const registry = new PluginRegistry()

        registry.add({
            key: 'foo',
            callable: () => {}
        })

        registry.add({
            key: 'bar',
            callable: () => {}
        })

        expect(Array.from(registry.keys())).toEqual(['foo', 'bar'])
    })

    it('provides plugins collection', () => {
        const registry = new PluginRegistry()

        const fooCallable = () => {}
        registry.add({
            key: 'foo',
            callable: fooCallable,
        })

        const barCallable = () => {}
        registry.add({
            key: 'bar',
            callable: barCallable
        })

        expect(Array.from(registry.all())).toEqual([
            {
                key: 'foo',
                callable: fooCallable,
                lazy: true,
            },
            {
                key: 'bar',
                callable: barCallable,
                lazy: true,
            }
        ])
    })
})

describe('applyPlugins', () => {
    it('throws exception when plugin is not defined', () => {
        const registry = new PluginRegistry()

        registry.add({
            key: 'foo',
            callable: () => {},
        })

        expect(() => {
            applyPlugins(registry, {}, {
                foo: 'foo',
                bar: 'bar',
            })
        }).toThrow('Plugin "bar" is not defined.')
    })

    it('skips lazy pluging if option key is not present', () => {
        const registry = new PluginRegistry()

        let fooCalled = false
        registry.add({
            key: 'foo',
            callable: () => {
                fooCalled = true
            },
            lazy: true,
        })

        let barCalled = false
        registry.add({
            key: 'bar',
            callable: () => {
                barCalled = true
            },
            lazy: false,
        })

        applyPlugins(registry, {}, {})

        expect(fooCalled).toBe(false)
        expect(barCalled).toBe(true)
    })

    it('passes subject and options to plugin callable', () => {
        const registry = new PluginRegistry()

        let fooSubject
        let fooOptions
        registry.add({
            key: 'foo',
            callable: (subject, options) => {
                fooSubject = subject
                fooOptions = options
            },
            lazy: true,
        })

        let barSubject
        let barOptions
        registry.add({
            key: 'bar',
            callable: (subject, options) => {
                barSubject = subject
                barOptions = options
            },
            lazy: false,
        })

        const subject = {}
        const options = {
            foo: 'foo',
            bar: 'bar',
        }

        applyPlugins(registry, subject, options)

        expect(fooSubject).toBe(subject)
        expect(fooOptions).toBe('foo')
        expect(barSubject).toBe(subject)
        expect(barOptions).toBe('bar')
    })

    it('allows to use plain functions', () => {
        const registry = new PluginRegistry()

        const subject = {}

        registry.add((subject) => {
            subject.called = true
        })

        applyPlugins(registry, subject)

        expect(subject.called).toBe(true)
    })
})
